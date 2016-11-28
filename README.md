**Udacity FrontEnd Nanodegree Proj 5**
Neighborhood Map
---

###Table of Contents
1. [Project Overview](#project-overview)
2. [Final Product](#final-product)
3. [Project Information](#project-information)
7. [How to Run (View locally)](#how-to-run)
9. [View Live](https://janinelourens.github.io/neen_ud-proj5-JS-Map/)

---

###Project-Overview

I developed a singe-page-application (SPA) featuring a map of my neighborhood. The map displays highlighted locations, utilizes an MVVM framework to dynamically filter locations and retrieves data about the selected location from third party APIs.

---
###Final-Product

![enter image description here](https://www.dropbox.com/s/of8u5xwsp6pbweu/neighborhoodsm.png?raw=1)

---

###Project-Information

- **Features / Tools used:**
  -  AJAX requests
  -  Utilized the [Knockout Javascript Framework](http://knockoutjs.com/), a MVVM framework.
  -  [Google Maps API](https://developers.google.com/maps/)
  -  [Yelp Fusion Api](https://www.yelp.com/developers)
  -  [SweetAlert2](https://limonte.github.io/sweetalert2/) beautiful customizable replacement for JavaScript popup boxes
  -  [jQuery](https://jquery.com/)

- **Project Specifications:**
  -   ✓ Responsive on Mobile, Tablet and Desktop
  -  ✓ Allows for location filtering
  -  ✓ A list view drop down is displayed when the user clicks on the search bar
  - ✓ Markers animate when clicked
  - ✓ Information regarding the marker is displayed when clicked, this data is fetched through Yelp API and displayed through a marker infoWindow
  - ✓ Code is Structured using Knockout's MVVM architecture
  - ✓ There are more than 5 locations
  -  ✓ Graceful Error Handling when yelp API is unable to load
  - ✓ Attribution is provided  to the YELP API

---

### How-to-Run:

#### **Getting the project on your system (viewing locally):**

1. Clone, Fork or Download the ZIP file of this project into a folder on your local machine.
2. Make sure you are connected to the net.
3. Unzip the file using Winrar / 7zip etc.
4. Double click the index.html file and open with your favorite browser. (Preferably Chrome :stuck_out_tongue: )

#### **Viewing through Localhost:**
1. Follow Steps 1-3 in the previous section.
2. Setup a Localhost Server (see below) in the project directory
3. In your favorite browser navigate to

```
localhost/name-of-folder/
OR
127.0.0.1/name-of-folder/
```


###**Creating-a-LocalHost**
Create a web server using your favorite method or if you don't know how, an easy way is to use XAMPP or Python's simpleserver

##### **Using XAMPP **
Follow this [tutorial](https://blog.udemy.com/xampp-tutorial/)

or

##### **Creating a Python 'SimpleHTTPServer**
1. Install [Python](https://www.python.org/downloads/)
2. Start a Localhost
```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080  (if python version = 2)
  OR
  $> python -m http.server 8080  (if python version = 3)
```


#### **Testing Live:**
View the site live here: https://janinelourens.github.io/neen_ud-proj5-JS-Map/

