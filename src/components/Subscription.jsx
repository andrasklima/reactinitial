import React, { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";

export default function Subscription(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget.parentElement;
    event.preventDefault();
    event.stopPropagation();

    const data = {
      email: form[0].value,
      hotel: props.name,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    setIsLoading(true);
    fetch("api/hotels/subscribe", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.success ? "Subscribed" : "Already subscribed");
        setTimeout(() => { props.hide(true)}, 5000);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <form>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            const value = e.target.value;
            const validEmail = value.includes("@") && value.includes(".");
            setSubmitIsDisabled(!validEmail);
          }}
        />
        <button disabled={submitIsDisabled} onClick={handleSubmit}>
          Submit
        </button>
        {isLoading && <LoadingMask />}
        {message && <div>{message}</div>}
      </form>
    </div>
  );
}
