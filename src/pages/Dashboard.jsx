import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { showToast } from "../utils/toast";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintsList from "../components/ComplaintsList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import { SkeletonCard } from "../components/ui/Skeleton";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollAnimation";

function Dashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "ALL", category: "ALL" });
  const [flatAssignments, setFlatAssignments] = useState([]);
  const [flatLoading, setFlatLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementLoading, setAnnouncementLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  // Removed PG-related state (not used in flats-only version)

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await api.getMyComplaints();
      setComplaints(data);
      setError("");
    } catch (err) {
      const errorMessage = err.message || "Failed to load complaints";
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const loadContext = async () => {
    try {
      setFlatLoading(true);
      setAnnouncementLoading(true);
      setEventsLoading(true);

      const [flats, announcements, events] = await Promise.all([
        api.getMyFlats().catch((err) => {
          console.warn("Failed to load flats", err);
          return [];
        }),
        api.getAnnouncements().catch((err) => {
          console.warn("Failed to load announcements", err);
          return [];
        }),
        api.getEvents().catch((err) => {
          console.warn("Failed to load events", err);
          return [];
        }),
      ]);

      setFlatAssignments(Array.isArray(flats) ? flats : []);
      setAnnouncements(
        Array.isArray(announcements) ? announcements.slice(0, 4) : []
      );
      setUpcomingEvents(Array.isArray(events) ? events.slice(0, 3) : []);
    } catch (err) {
      console.error("Failed to load dashboard context", err);
      setFlatAssignments([]);
      setAnnouncements([]);
      setUpcomingEvents([]);
    } finally {
      setFlatLoading(false);
      setAnnouncementLoading(false);
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    loadContext();
  }, []);

  const handleComplaintCreated = () => {
    fetchComplaints();
    showToast.success("Complaint created successfully!");
  };

  // Handle filter changes with loading state
  const handleFilterChange = (newFilters) => {
    setFilterLoading(true);
    setFilters(newFilters);
    // Show loading animation for a brief moment
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  const handleSearchChange = (query) => {
    setFilterLoading(true);
    setSearchQuery(query);
    // Show loading animation for a brief moment
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  // Filter and search complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      // Search filter - search by title, description, or category
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        complaint.title?.toLowerCase().includes(searchLower) ||
        complaint.description?.toLowerCase().includes(searchLower) ||
        complaint.category?.toLowerCase().includes(searchLower);

      // Status filter - handle case sensitivity
      const complaintStatus = complaint.status?.toUpperCase();
      const filterStatus = filters.status?.toUpperCase();
      const matchesStatus =
        filterStatus === "ALL" || complaintStatus === filterStatus;

      // Category filter
      const matchesCategory =
        filters.category === "ALL" || complaint.category === filters.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [complaints, searchQuery, filters]);

  // Format flat assignments for display
  const visibleAssignments = useMemo(() => {
    if (!Array.isArray(flatAssignments) || flatAssignments.length === 0) {
      return [];
    }
    // If flats are returned directly, format them
    return flatAssignments.map((flat) => ({
      id: flat.id,
      flat: {
        id: flat.id,
        buildingName: flat.building || `Building ${flat.building}`,
        flatNumber: flat.number,
        block: flat.building,
        floor: flat.floor,
        type: flat.type,
      },
      relation: "OWNER",
      isPrimary: true,
    }));
  }, [flatAssignments]);

  return (
    <div className="dashboard space-y-8">
      <ScrollAnimation>
        <div className="dashboard-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[var(--color-text-primary)] mb-2"
          >
            Welcome back, {user?.name}! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            Manage your complaints and track their status
          </motion.p>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              My Flat
            </h2>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {visibleAssignments.length > 1 && "Multiple units"}
            </span>
          </div>
          {flatLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : visibleAssignments.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-sm">
              No flat assignment yet. Contact your admin to link your apartment.
            </p>
          ) : (
            <div className="space-y-3">
              {visibleAssignments.map((assignment) => (
                <div
                  key={assignment.id || assignment.flat?.id}
                  className="border border-[var(--color-border)] rounded-lg px-3 py-3"
                >
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Building{" "}
                    {assignment.flat?.buildingName ||
                      assignment.flat?.block ||
                      "—"}{" "}
                    · Flat{" "}
                    {assignment.flat?.flatNumber ||
                      assignment.flat?.number ||
                      "—"}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {assignment.flat?.type && `${assignment.flat.type} · `}
                    Floor {assignment.flat?.floor ?? "—"}
                  </p>
                  {assignment.isPrimary && (
                    <span className="inline-flex mt-2 px-2 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-white">
                      Primary home
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Notices, Events & Maintenance
            </h2>
            <button
              type="button"
              onClick={loadContext}
              className="text-xs text-[var(--color-primary)] hover:underline"
            >
              Refresh
            </button>
          </div>
          {announcementLoading || eventsLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : announcements.length === 0 && upcomingEvents.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-sm">
              No announcements or events.
            </p>
          ) : (
            <div className="space-y-3">
              {announcements.map((notice) => (
                <div
                  key={notice.id}
                  className={`rounded-lg border px-3 py-2 ${
                    notice.priority === "HIGH"
                      ? "border-[var(--color-error)] bg-[var(--color-error-light)]/30"
                      : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {notice.title}
                    </span>
                    <span className="text-xs uppercase text-[var(--color-text-tertiary)]">
                      {notice.priority || "ANNOUNCEMENT"}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {notice.content || notice.body}
                  </p>
                </div>
              ))}
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border px-3 py-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {event.title}
                    </span>
                    <span className="text-xs uppercase text-[var(--color-text-tertiary)]">
                      EVENT
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {new Date(event.date).toLocaleDateString()} ·{" "}
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScrollAnimation delay={0.2}>
          <Card padding="lg">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
              My Complaints
              {!loading && (
                <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
                  ({filteredComplaints.length} of {complaints.length})
                </span>
              )}
            </h2>
            <div className="space-y-4 mb-6">
              <SearchBar
                onSearch={handleSearchChange}
                placeholder="Search complaints by title or description..."
              />
              <FilterBar
                onFilterChange={handleFilterChange}
                currentFilters={filters}
              />
            </div>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="bg-[var(--color-error-light)] border border-[var(--color-error)] text-[var(--color-error)] p-4 rounded-lg">
                {error}
              </div>
            ) : filterLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader />
              </div>
            ) : (
              <ComplaintsList
                complaints={filteredComplaints}
                filters={{ ...filters, searchQuery }}
                totalComplaints={complaints.length}
              />
            )}
          </Card>
        </ScrollAnimation>

        <ScrollAnimation delay={0.3}>
          <Card padding="lg">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
              Create New Complaint
            </h2>
            <ComplaintForm
              onComplaintCreated={handleComplaintCreated}
              flats={visibleAssignments}
            />
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default Dashboard;
