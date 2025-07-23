// // CLIENT-SIDE JS - Update to your existing code
// const loadingOverlay = document.getElementById("loading-overlay");

          // Submit details and send to the server
          const paymentsubmissionForm = document.getElementById("paymentForm");
          paymentsubmissionForm.addEventListener("submit", async (event) => {
            event.preventDefault();
          
            const amount = document.getElementById("payvalue").value.trim();
            const number = document.getElementById("paynumber").value.trim();
                    
            // // const phoneNumberRegex = /^0\d{9}$/;
            // const phoneNumberRegex = /^(2547|2541)\d{8}$/;
            const phoneNumberRegex = /^(2547\d{8}|07\d{8}|01\d{8})$/;

            // Basic client-side validation
            if (amount == "" || number =="") {
              document.getElementById("premium_error").style.display = "block";
              document.getElementById("premium_error").style.background = "rgb(240, 190, 190)";
              document.getElementById("premium_error").textContent = "Please fill all the fields";
              document.getElementById("premium_contact").style.outline = "solid red 1pt";
              document.getElementById("premium_error").style.color = "red";
              return;
            } else {
              document.getElementById("premium_error").style.display = "none";
            //   document.getElementById("premium_contact").style.outline = "solid transparent 1pt";
            }

            if (amount < 100) {
                document.getElementById("premium_error").style.display = "block";
                document.getElementById("premium_error").style.background = "rgb(240, 190, 190)";
                document.getElementById("premium_error").textContent = "Please enter amount greater than or equals to 100";
                document.getElementById("payvalue").style.outline = "solid red 1pt";
                document.getElementById("premium_error").style.color = "red";
                return;
              } else {
                document.getElementById("premium_error").style.display = "none";
              }
               
            if (!phoneNumberRegex.test(number)) {
              document.getElementById("number_error").style.display = "block";
              document.getElementById("number_error").style.background = "rgb(240, 190, 190)";
              document.getElementById("number_error").textContent = "Please input correct phone number";
              document.getElementById("paynumber").style.outline = "solid red 1pt";
              document.getElementById("number_error").style.color = "red";
              return;
            } else {
              document.getElementById("number_error").style.display = "none";
            }
        
            document.getElementById("premium_error").style.display = "none";
            document.getElementById("number_error").style.outline = "";
            // showLoadingSpinner();
            const formatedNumber = number.startsWith('0') ? `254${number.slice(1)}` : number;
            
            try {
              // Format phone number to international format (remove leading 0, add 254)
            //   const formattedPhone = amount.startsWith('0') ? 254${contact.slice(1)} : contact;
              
              const response = await fetch('/contribution', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: amount,
                  number: formatedNumber,
                  
                }),
              });
        
              const result = await response.json();
              if (response.ok) {
                alert(result, "Payment initiated successfully")
              } else {
                alert("An error occured please try again later")
              }
            } catch (error) {
              console.error(result, 'Error:', error);
              alert("An error occured please try again later")
            }
            // hideLoadingSpinner();
          });


          // Show the popup
function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex'; // Display the popup as a flexbox
}

// Close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide the popup
}
