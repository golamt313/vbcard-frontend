import React from 'react';
import * as emailjs from 'emailjs-com';
import Recaptcha from 'react-recaptcha';
import firebase from "../firebase";
import {v4 as uuidv4 } from 'uuid'

import { Field, Label, Control, Input, Button, Textarea } from 'rbx';

class ContactForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      recaptchaLoad: false,
      isVerified: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifiedRecaptcha = this.verifiedRecaptcha.bind(this);
  }

  recaptchaLoaded() {
    this.setState({ recaptchaLoad: true });
  }
  
  verifiedRecaptcha(response) {
    if (response) {
      this.setState({ isVerified: true });
    }
  }

  handleSubmit(event) {
    const { recaptchaLoad, isVerified } = this.state;
    event.preventDefault();
    const ref = firebase.firestore().collection("contacts");
    if (recaptchaLoad && isVerified) {
    const { name, phone, email, company, subject, message } = this.state;
    const templateParams = {
      from_name: name,
      from_phone: phone,
      from_email: email,
      from_company: company,
      to_name: 'Mohammed',
      subject,
      message_html: message,
    };
    const contactsBook = {
      id: uuidv4(),
      name: name,
      phone: phone,
      email: email,
      company: company
    }
    emailjs.send(
      'service_n03pq8f',
      'template_bwgoif6',
       templateParams,
      'user_eseN9F1244798pk4LZt1r'
    )
    ref
    .doc(contactsBook.id)
    .set(contactsBook)
    .catch((err) => {
        console.log(err);
    });
    alert('Your message has been sent successfully. We will contact you soon.');
    this.resetForm();
    } else {
      alert('Please check the Recaptcha before sending your message');
    }
  };

  resetForm() {
    this.setState({
      name: '',
      phone: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, phone, email, company, subject, message} = this.state;
    const resetRecaptcha = () => {
      recaptchaInstance.reset();  
    };
    let recaptchaInstance;
    return (
        <div className="contactFormWrapper">
        <h1 id="contactMe">Contact Me</h1>
            <form onSubmit={this.handleSubmit}>
            <Field className="floatLeft">
                <Label>Name</Label>
                <Control>
                <Input
                    id="nameInput"
                    name="name"
                    type="text"
                    placeholder="Your first and last name"
                    value={name}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>
            <Field className="floatLeft">
                <Label id="phoneMargin">Phone</Label>
                <Control>
                <Input
                    id="phoneInput"
                    name="phone"
                    type="text"
                    placeholder="XXX-XXX-XXXX"
                    value={phone}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>
            <Field className="floatLeft">
                <Label>Email</Label>
                <Control>
                <Input
                    id="emailInput"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>
            <Field className="floatLeft">
                <Label>Company</Label>
                <Control>
                <Input
                    id="companyInput"
                    name="company"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>
            <Field className="floatLeft">
                <Label>Subject</Label>
                <Control>
                <Input
                    id="subjectInput"
                    name="subject"
                    type="text"
                    placeholder="What is the subject?"
                    value={subject}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>
            <Field>
                <Label className="floatLeft">Message</Label>
                <Control>
                <Textarea
                    id="commentInput"
                    name="message"
                    placeholder="Tell me more about..."
                    value={message}
                    onChange={this.handleChange}
                />
                </Control>
            </Field>

            <Field>
                <Control>
                <Recaptcha
                  elementID="reCaptcha"
                  size="normal"
                  ref={e => recaptchaInstance = e}
                  sitekey="6LeyhNoZAAAAADXckDVT8SgTHiW1tgCk0WfDuZkd"
                  render="explicit"
                    onloadCallback={this.recaptchaLoaded}
                    verifyCallback={this.verifiedRecaptcha}
                />
                </Control>
                <Control>
                <Button id="sendButton" onClick={resetRecaptcha}>Send</Button>
                </Control>
            </Field>
            </form>
            <h5 id="copyRight">© 2020  T&T Graphics Printing LLC. ALL RIGHTS RESERVED.</h5>
        </div>
    );
  }
}

export default ContactForm;
