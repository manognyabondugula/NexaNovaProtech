const apiBase = 'http://localhost:3000/api';

const setFeedback = (id, message) => {
  document.getElementById(id).innerText = message;
};

// Add Trainer
document.getElementById('addTrainerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  const res = await fetch(`${apiBase}/trainers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (res.ok) {
    setFeedback('addTrainerFeedback', `✅ Added! Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}, Specialization: ${data.specialization}`);
    form.reset();
  } else {
    setFeedback('addTrainerFeedback', `❌ Error: ${result.error || result.sqlMessage}`);
  }
});

// Delete Trainer
document.getElementById('deleteTrainerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.id.value;

  const res = await fetch(`${apiBase}/trainers/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    setFeedback('deleteTrainerFeedback', `🗑️ Deleted! Trainer with ID ${id} removed successfully.`);
    e.target.reset();
  } else {
    const result = await res.json();
    setFeedback('deleteTrainerFeedback', `❌ Error: ${result.error || result.sqlMessage}`);
  }
});

// Get Trainers by Subject Name
document.getElementById('getTrainerBySubjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;

  const res = await fetch(`${apiBase}/trainer/${subject}/topic`);
  const results = await res.json();

  setFeedback('subjectTrainerResults', results.length ?
    results.map(t => `👨‍🏫 ${t.name} (${t.email}) - ${t.specialization}`).join('\n') :
    '⚠️ No trainers found for that subject.');
});

// Get Trainers by Subject ID
document.getElementById('getTrainerBySubjectIdForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.id.value;

  const res = await fetch(`${apiBase}/subject/${id}`);
  const results = await res.json();

  setFeedback('subjectIdTrainerResults', results.length ?
    results.map(t => `📘 ${t.name} - ${t.specialization}`).join('\n') :
    '⚠️ No subject or trainers found.');
});

// Add Subject
document.getElementById('addSubjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.subject_name.value;

  const res = await fetch(`${apiBase}/subject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject_name: name })
  });

  const result = await res.json();
  if (res.ok) {
    setFeedback('addSubjectFeedback', `📚 Subject Added! Subject Name: ${name}`);
    e.target.reset();
  } else {
    setFeedback('addSubjectFeedback', `❌ Error: ${result.error || result.sqlMessage}`);
  }
});

// Load All Trainers
document.getElementById('loadAllTrainers').addEventListener('click', async () => {
  const res = await fetch(`${apiBase}/trainers`);
  const trainers = await res.json();

  setFeedback('allTrainersList', trainers.length ?
    trainers.map(t => `🧑‍🏫 ${t.name} (${t.email}) - ${t.specialization}`).join('\n') :
    '⚠️ No trainers found.');
});
