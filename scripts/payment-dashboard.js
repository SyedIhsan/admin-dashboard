/**
 * Payment Dashboard JavaScript (pages/payment/dashboard.html)
 * Chart initialization and data rendering for payment dashboard
 */

// Chart data (last 6 months)
const chartLabels = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026'];
const chartRevenue = [28450.50, 31200.75, 35890.20, 38450.60, 42100.80, 45235.80];
const chartSales = [85, 92, 108, 115, 128, 135];

// Chart theme
const LINE_COLOR = '#F7B500';  // Yellow-500
const AMBER_TEXT = '#92400e';  // Amber-800
const GRID_COLOR = 'rgba(148,163,184,.25)';

// Format currency (MYR)
const moneyMYR = (n) =>
  'RM' + Number(n || 0).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

// Create gradient for area chart
const areaGradient = (ctx, topColor, bottomColor) => {
  const chart = ctx.chart;
  const { ctx: canvas, chartArea } = chart;
  if (!chartArea) return null;

  const gradient = canvas.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  return gradient;
};

// Crosshair plugin for charts
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw(chart) {
    const tooltip = chart.tooltip;
    if (!tooltip || !tooltip.getActiveElements().length) return;

    const { ctx } = chart;
    const { top, bottom } = chart.chartArea;
    const x = tooltip.getActiveElements()[0].element.x;

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(247,181,0,.45)';
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
    ctx.restore();
  }
};

// Revenue Chart (Line with Area Fill)
const revChart = new Chart(document.getElementById('revChart'), {
  type: 'line',
  data: {
    labels: chartLabels,
    datasets: [
      {
        label: 'Revenue',
        data: chartRevenue,
        borderColor: LINE_COLOR,
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: LINE_COLOR,
        fill: true,
        backgroundColor: (ctx) =>
          areaGradient(ctx, 'rgba(247,181,0,.22)', 'rgba(247,181,0,0)')
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111827',
        bodyColor: AMBER_TEXT,
        borderColor: 'rgba(226,232,240,1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => items?.[0]?.label ?? '',
          label: (item) =>
            `${item.dataset.label}: ${moneyMYR(item.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#94a3b8', font: { size: 12 } }
      },
      y: {
        ticks: { display: false },
        grid: {
          drawBorder: false,
          borderDash: [4, 4],
          color: GRID_COLOR
        }
      }
    }
  },
  plugins: [crosshairPlugin]
});

// Sales Volume Chart (Bar)
const salesChart = new Chart(document.getElementById('salesChart'), {
  type: 'bar',
  data: {
    labels: chartLabels,
    datasets: [
      {
        label: 'Sales',
        data: chartSales,
        backgroundColor: LINE_COLOR,
        borderRadius: 10,
        borderSkipped: false
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111827',
        bodyColor: AMBER_TEXT,
        borderColor: 'rgba(226,232,240,1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => items?.[0]?.label ?? '',
          label: (item) => `${item.dataset.label}: ${Number(item.parsed.y || 0)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#94a3b8', font: { size: 12 } }
      },
      y: {
        ticks: { display: false },
        grid: {
          drawBorder: false,
          borderDash: [4, 4],
          color: GRID_COLOR
        }
      }
    }
  }
});
