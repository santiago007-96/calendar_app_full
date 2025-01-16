export async function addUser(data) {
  try {
    if (data.password != data.confirmPassword) {
      return alert("Passwords do not match!");
    }

    const url = "/api/auth/register";
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    };

    const response = await fetch(url, params);
    //const result = await response.json();
    return response;
  } catch (error) {
    throw error;
  }
}
