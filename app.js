const forms = document.querySelectorAll(".signup-form");
//console.log(forms);

const getTemplate = () => {
  return fetch("./template.html").then((response) => response.text());
};

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      if (results.status == 200) {
        alert("E-mail Send!");
      } else {
        alert("Send Failed");
      }
      document.getElementById("email").value = "";
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = "";
      alert("Send failed");
    });
};

const sendEmail = (miVariable) => {
  miVariable.preventDefault();
  //   console.log(miVariable);
  const email = miVariable.target.querySelector("input").value;
  //   console.log(email);
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error) => {
      console.log(error, "error al obtener el template");
    });
};

for (let i = 0; i < forms.length; i++) {
  //   console.log(forms[i]);
  forms[i].addEventListener("submit", sendEmail);
}
