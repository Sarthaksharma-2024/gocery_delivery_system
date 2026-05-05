async function testAPI() {
  try {
    const response = await fetch('http://localhost:4000/api/chatbot/alternatives/69ecacbd04ac6a7ce59ff518');
    const data = await response.json();
    console.log('Alternatives for Dragon Fruit:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();