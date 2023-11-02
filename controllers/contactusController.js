const catchAsyncError = require("../middlewares/catchAsyncError");
const Contact = require("../models/contactModel");

exports.submitContactForm = catchAsyncError(async (req, res, next) => {
  try {
    const { firstName, email, phoneNumber, subject, text } = req.body;

    // Create a new contact object
    const contact = new Contact({
      firstName,
      email,
      phoneNumber,
      subject,
      text,
    });

    // Validate the contact object
    const validationError = contact.validateSync();
    if (validationError) {
      const errors = validationError.errors;
      const errorMessages = Object.values(errors).map(error => error.message);
      return res.status(400).json({ error: errorMessages });
    }

    // Save the contact to the database
    await contact.save();

    res.status(201).json({ message: 'Contact form submitted successfully.' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
})

// Controller to get all contact details
exports.getContactDetails = catchAsyncError (async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contact details:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
})

  










