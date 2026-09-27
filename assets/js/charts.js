// Sanskaar ERP - Chart Helpers (Chart.js wrappers with Nepal ERP themes)
window.SanskaarCharts = {
  colors: {
    brand: '#E8752F',
    brandLight: '#FFF7ED',
    brandDark: '#C2410C',
    emerald: '#10B981',
    emeraldLight: '#ECFDF5',
    blue: '#3B82F6',
    blueLight: '#EFF6FF',
    amber: '#F59E0B',
    rose: '#F43F5E',
    purple: '#8B5CF6',
    slate: '#64748B',
    grid: '#F1F5F9'
  },

  createRevenueChart(canvasId, labels, data, label = 'Revenue (NPR)') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels || ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
        datasets: [{
          label: label,
          data: data || [1150000, 1220000, 1280000, 1310000, 1350000, 1420000, 1450000, 1485000],
          borderColor: '#E8752F',
          backgroundColor: 'rgba(232, 117, 47, 0.08)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#E8752F',
          pointBorderColor: '#fff',
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'NPR ' + (context.raw || 0).toLocaleString('en-IN');
              }
            }
          }
        },
        scales: {
          y: {
            grid: { color: '#F1F5F9' },
            ticks: {
              callback: function(val) {
                return (val / 100000).toFixed(1) + ' Lakh';
              },
              font: { size: 10 }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  },

  createDonutChart(canvasId, labels, data, backgroundColors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors || ['#10B981', '#E8752F', '#3B82F6', '#F59E0B'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        }
      }
    });
  },

  createBarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        borderRadius: 6,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        scales: {
          y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }
};
