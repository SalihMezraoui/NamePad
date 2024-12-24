/* global alert */

export function removeFromNotepad (userId) {
  console.log('UserID:', userId);
  // Make an AJAX request to remove the user from the notepad
  fetch(`/api/notepad/remove/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(data.message || 'User removed from notepad successfully');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message || 'Error removing user from notepad');
    });
}

window.removeFromNotepad = removeFromNotepad;
