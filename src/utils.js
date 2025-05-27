export async function readUsersFile() {
    const response = await fetch('/users.txt');
    const text = await response.text();
    return text.split('\n').map(line => {
      const [email, password] = line.split(',');
      return { email, password };
    });
  }
  
  export async function saveContact(formData) {
    const data = new Blob([JSON.stringify(formData, null, 2)], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.txt";
    a.click();
  }
  