import React, { useState, useCallback } from "react";
import Heading from "../components/Heading";
import { usePostApi } from "../Api/usePostApi";
import { useToast } from "../hooks/useToast";
import { SEO } from "../components/SEO";
import { getCanonicalUrl } from "../utils/seoHelpers";

const ContactUs = () => {
  const showToast = useToast();
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setContactDetails((current) => ({ ...current, [name]: value }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !contactDetails.name ||
      !contactDetails.email ||
      !contactDetails.phone ||
      !contactDetails.query
    ) {
      showToast("All fields are mandatory.", 2500, "😊", "top-right");
      return;
    }

    const response = await usePostApi("/newsapi/contactus", contactDetails);
    if (response?.success) {
      showToast(response.msg, 2500, "😊", "top-right");
      setContactDetails({ name: "", email: "", phone: "", query: "" });
    } else {
      const data = response?.error?.errors?.errors;
      showToast(
        data?.[0]?.msg || response?.error || "Unable to send message.",
        2500,
        "😅",
        "top-right",
      );
    }
  };

  return (
    <>
      <SEO
        title="Contact Daily News Flow"
        description="Reach out with questions, story ideas, or support requests for Daily News Flow."
        keywords="contact, support, news feedback, Daily News Flow"
        url={getCanonicalUrl("/contactus")}
        type="website"
      />
      <section className="page-section" aria-labelledby="contact-heading">
        <Heading heading="Contact Us" />
        <form className="contact-us" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Name*"
            value={contactDetails.name}
            onChange={handleChange}
            required
          />

          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email*"
            value={contactDetails.email}
            onChange={handleChange}
            required
          />

          <label className="sr-only" htmlFor="contact-phone">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            maxLength="10"
            minLength="10"
            value={contactDetails.phone}
            onChange={handleChange}
            required
          />

          <label className="sr-only" htmlFor="contact-query">
            Query
          </label>
          <textarea
            id="contact-query"
            name="query"
            placeholder="Your message*"
            rows="5"
            value={contactDetails.query}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button button--primary">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default ContactUs;
