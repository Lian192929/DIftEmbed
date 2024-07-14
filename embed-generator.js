document.getElementById('sendEmbed').addEventListener('click', function() {
  const webhookURL = document.getElementById('webhookURL').value;
  const name = document.getElementById('name').value || 'Undefined';
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const color = document.getElementById('color').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const thumbnailUrl = document.getElementById('thumbnailUrl').value;
  const authorName = document.getElementById('authorName').value;
  const authorIconUrl = document.getElementById('authorIconUrl').value;
  const footerText = document.getElementById('footerText').value;
  const footerIconUrl = document.getElementById('footerIconUrl').value;

  const embedData = {
    username: name,
    embeds: [{
      title: title,
      description: description,
      color: parseInt(color.substr(1), 16),
      image: { url: imageUrl },
      thumbnail: { url: thumbnailUrl },
      author: { name: authorName, icon_url: authorIconUrl },
      footer: { text: footerText, icon_url: footerIconUrl },
      fields: []
    }]
  };

  const fieldNames = document.querySelectorAll('.field-name');
  const fieldValues = document.querySelectorAll('.field-value');
  fieldNames.forEach((fieldName, index) => {
    const name = fieldName.value;
    const value = fieldValues[index].value;
    if (name && value) {
      embedData.embeds[0].fields.push({ name: name, value: value });
    }
  });

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(embedData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    showAlert('Embed sent successfully', 'success');
  })
  .catch(error => showAlert('Error sending embed: ' + error.message, 'error'));
});

document.getElementById('showOptions').addEventListener('click', function() {
  const additionalOptions = document.getElementById('additionalOptions');
  if (additionalOptions.style.display === 'none' || additionalOptions.style.display === '') {
    additionalOptions.style.display = 'block';
  } else {
    additionalOptions.style.display = 'none';
  }
});

function showAlert(message, type) {
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert', type);
  alertElement.textContent = message;
  document.body.appendChild(alertElement);
  setTimeout(() => {
    alertElement.classList.add('show'); 
    setTimeout(() => {
      alertElement.remove();
    }, 5000);
  }, 100); 
}