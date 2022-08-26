async function loginService(state) {
    // let dataUser = "";
    const dataRes = await fetch('http://127.0.0.1:8000/api-auth/token/', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json' },
    })

    const jsonData = await dataRes.json();
    return jsonData;

  }

export default loginService;