# Dynamic Form Builder

## Features

- **Dynamic Question Management**: Add and remove form questions with ease
- **Multiple Input Types**: Support for various input field types:
  - Text
  - Number
  - Date
  - Color
  - Password
- **Real-time Preview**: See how each input type displays as you change the type selector
- **Shareable Forms**: Generate shareable links that encode your form configuration
- **URL-based Form Loading**: Forms automatically load and reconstruct from URL parameters
- **Responsive Design**: Clean, modern UI with proper spacing and styling
- **Form Validation**: Ensures at least one question remains in the form

## How to Use

1. **Create Questions**: Enter your question text in the input field
2. **Select Input Type**: Choose the appropriate input type from the dropdown menu
3. **Preview Answers**: See how the answer field will appear based on the selected type
4. **Add More Questions**: Click "+ Add Next Question" to add additional questions
5. **Remove Questions**: Use the × button to delete questions (minimum 1 required)
6. **Share Your Form**: Click "Generate Shareable Link" to:
   - Encode your form configuration
   - Copy the link to your clipboard
   - Share it with others who can reload the exact same form

## Technical Details

- **Data Encoding**: Form data is Base64-encoded and compressed into the URL query parameter `?f=`
- **No Backend Required**: All functionality works entirely in the browser
- **Data Persistence**: Form configurations are preserved when sharing links and reopening them
