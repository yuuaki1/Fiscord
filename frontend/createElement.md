return fetch('http://localhost:8000/server/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ServerName),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });


const serverList = document.getElementById('server-list')
    const server = document.createElement('button')
    server.classList.add('flex', 'items-center', 'justify-center', 'w-14', 'h-14', 'bg-[#343838]', 'mb-3', 'rounded-[50%]', 'hover:bg-[#646cf8]', 'hover:rounded-2xl', 'duration-200')
    serverList.appendChild(server)
    HandleClose()