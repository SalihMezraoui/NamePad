/* global alert */

export function addToNotepad (userId) {
  fetch(`/api/notepad/add/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Im Falle eines Fehlers eine Warnung anzeigen
        alert(data.message || 'Error adding user to notepad');
      } else {
        if (data.message === 'User already in notepad') {
          alert('User already in notepad');
        } else {
          alert(data.message || 'User added to notepad successfully');
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

window.addToNotepad = addToNotepad;
