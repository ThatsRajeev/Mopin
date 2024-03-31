import React, { useState } from "react";
import { MuiTelInput } from 'mui-tel-input';
import axios from "axios";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import sendFormData from "../../../utils/sendFormData";
import "./HelpAndSupport.css";

function HelpAndSupport({ setShowProp }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const subjectOptions = [
    "Not able to place an order",
    "Products Enquiry",
    "Money Deducted order not placed",
    "Service Enquiry",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      number: number.replace(/\s/g, ''),
      subject,
      message,
    };

    try {
      const res = await sendFormData(data);
      setIsSuccess(res.ok === true);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="help-section">
      <h3 className="pc-view"> Help & Support </h3>
      {!isSuccess ? (
        <>
          <p className="help-info">
            If you have any questions or need help with your order, please don't hesitate to contact us.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <MuiTelInput defaultCountry="IN" fullWidth size="small" placeholder="Phone Number"
              sx={{ margin: '18px 0' }} value={number} onChange={setNumber} />

              <TextField name="name" fullWidth label="Name" size="small" sx={{ marginBottom: '18px' }}
                value={name} onChange={(e) => setName(e.target.value)} />

              <FormControl fullWidth size="small" sx={{ marginBottom: '18px' }}>
                <InputLabel>Issue:</InputLabel>
                <Select
                  value={subject}
                  label="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  {subjectOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="message"
                label="Message"
                multiline fullWidth
                rows={4}
                value={message}
                sx={{ marginBottom: '18px' }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button type="submit" variant="contained" disabled={!name || !number || !subject || !message} fullWidth>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>

          </form>
        </>
      ) : (
        <div className="success-container">
          <div>
            <CheckCircleIcon color="ochra" sx={{ fontSize: '6rem' }} />
            <p className="success-msg">Query registered successfully!</p>
          </div>
          <p>Thank you for your patience. We will get back to you as soon as possible</p>
        </div>
      )}
      {isError && (
        <div className="error-container">
          <div>
            <ErrorIcon sx={{ color: 'red', fontSize: '6rem' }} />
            <p className="error-msg">Failed to submit query. Please try again later.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpAndSupport;
