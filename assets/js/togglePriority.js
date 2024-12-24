export function togglePriority (userId) {
  fetch(`/api/notepad/toggle-priority/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Priority toggle response:', data);

      // Dynamically update the styles based on the priority
      const row = document.getElementById(`row_${userId}`);
      if (row) {
        row.classList.toggle('priority-row', data.priority);
      }
    })
    .catch(error => {
      console.error('Error toggling priority:', error);
    });
}

window.togglePriority = togglePriority;
