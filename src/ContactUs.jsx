import React, { useReducer, useState } from "react";
import Heading from "./Heading";
import { usePostApi } from "./Api/usePostApi";
import { useToast } from "./useToast";

const ContactUs = () => {
  const handleClick = async () => {
    const showToast = useToast();
    if (
      !contactDetails.name ||
      !contactDetails.email ||
      !contactDetails.phone ||
      !contactDetails.query
    ) {
      showToast(" All the Feilds are Mandatory", 2500, "😊", "top-right");
    }
    const response = await usePostApi("/newsapi/contactus", contactDetails);
    if (response?.success) {
      showToast(response?.msg, 2500, "😊", "top-right");
    } else if (!response?.error?.success) {
      const data = response?.error?.errors?.errors;
      showToast(data[0]?.msg, 2500, "😅", "top-right");
    }
  };
  const handleChange = (event, type) => {
    if (type === "name") {
      setContactDetails({ ...contactDetails, name: event.target.value });
    } else if (type === "email") {
      setContactDetails({ ...contactDetails, email: event.target.value });
    } else if (type === "phone") {
      setContactDetails({ ...contactDetails, phone: event.target.value });
    } else if (type === "query") {
      setContactDetails({ ...contactDetails, query: event.target.value });
    }
  };
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });
  return (
    <>
      <Heading heading={"Contact US/Query"} />
      <form className="contact-us">
        <input
          type="text"
          placeholder="Name*"
          name="name"
          value={contactDetails.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <input
          type="email"
          placeholder="Email*"
          name="email"
          value={contactDetails.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <input
          type="phone"
          placeholder="Phone Number*"
          name="phone"
          maxLength="10"
          minLength="10"
          value={contactDetails.phone}
          onChange={(e) => handleChange(e, "phone")}
        />
        <textarea
          type="text"
          placeholder="Query*"
          rows="5"
          cols="50"
          name="query"
          value={contactDetails.query}
          onChange={(e) => handleChange(e, "query")}
        />
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ContactUs;
