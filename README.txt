COLLEGE STUDY HUB — QUICK SETUP

FILES
- index.html  : website page
- style.css   : design and mobile layout
- data.js     : semesters, subjects and Google Drive links
- script.js   : website interactions

HOW TO ADD GOOGLE DRIVE LINKS
1. Open data.js in a text editor (Notepad or VS Code).
2. Find the semester and subject you want to update.
3. Replace the empty quotes after assignmentsUrl and notesUrl with the correct Google Drive folder links.
   Example:
   { name: "Database Management System",
     assignmentsUrl: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
     notesUrl: "https://drive.google.com/drive/folders/YOUR_NOTES_FOLDER_ID" }
4. Replace "Subject 1", "Subject 2" with actual subject names.
5. Save the file.

GOOGLE DRIVE SHARING
For each folder in Google Drive:
- Right-click folder > Share
- Under General access choose "Anyone with the link"
- Set role to "Viewer"
- Copy link and paste it into data.js

IMPORTANT
- Students do not need to log in to this website.
- Google Drive folder access must be set to "Anyone with the link — Viewer", otherwise students may see an access request.
- This is a static website. There is no teacher admin panel; the teacher updates links in data.js and the site is re-uploaded.
- You can test it by double-clicking index.html and opening it in a browser.
- To publish it online, upload these files to a static hosting service such as GitHub Pages or Netlify.
