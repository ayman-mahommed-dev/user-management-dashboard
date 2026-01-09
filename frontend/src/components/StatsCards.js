import "./StatsCards.css";

function StatsCards({ stats, loading }) {
  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card skeleton">
            <div className="skeleton-icon"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: "fa-users",
      color: "primary",
      subtitle: "All team members"
    },
    {
      title: "Active",
      value: stats.activeEmployees,
      icon: "fa-user-check",
      color: "success",
      subtitle: "Currently working"
    },
    {
      title: "On Leave",
      value: stats.onLeaveEmployees,
      icon: "fa-user-clock",
      color: "warning",
      subtitle: "Away from work"
    },
    {
      title: "Total Payroll",
      value: `$${stats.totalSalary?.toLocaleString()}`,
      icon: "fa-money-bill-wave",
      color: "info",
      subtitle: `Avg: $${stats.avgSalary?.toLocaleString()}`
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div key={index} className={`stat-card stat-${card.color}`}>
          <div className="stat-icon">
            <i className={`fas ${card.icon}`}></i>
          </div>
          <div className="stat-content">
            <span className="stat-value">{card.value}</span>
            <span className="stat-title">{card.title}</span>
            <span className="stat-subtitle">{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
