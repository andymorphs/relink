$(document).ready(function() {
const ctx = document.getElementById('myChart2');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Subs on YouTube',
        data: [213 , 203, 120, 143, 199],
        borderWidth: 2,
        backgroundColor: [
	      'rgba(61, 99, 255, 1)'
	    ],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });




  const ctx2 = document.getElementById('myChart');

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Views on YouTube',
        data: [76888 , 85791, 63807, 73144, 131962],
        borderWidth: 2,
        backgroundColor: [
	      'rgba(61, 99, 255, 1)'
	    ],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


 });