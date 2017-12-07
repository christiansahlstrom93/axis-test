# Assignment

Your assignment is to implement a small single-page application (SPA), in
JavaScript, which displays sites and their devices.

Even though the assignment is small we would like you to imagine it as part of
a bigger application where you need to use good practices to ease scaling,
prevent regressions of bugs and keep a well formed code base. You should also
imagine that the project will be shared with a number of other developers
which need to understand the code to make changes and additions. Remember that
you are doing this to show us what you are good at, every little detail
matters.

We would like you to hold back from using large frameworks and starter kits
where everything is generated for you. It makes it hard for us to know what
you've added (with a reason behind it) and what was added for you. We do
however encourage you to use npm and its large collection of smaller
libraries.

We would like the finished solution to at least be able to:

 * Display all the sites available to a specific user
 * Allow interaction with sites to display additional information about the
   devices associated with each site

A site represents a collection of devices, typically based on a geographic
location. A device can represent a camera, video encoder, storage unit, etc.

As a data source, we've prepared a simulated REST API for you using
json-server. Start it by running:

  npm run api

Use this API to fetch the available data. You can read more about json-server
at:

  https://github.com/typicode/json-server

We would appreciate it if you used git for version control (so that we can use
`git log` to see the development process) but you're not required to do so.

Last but not least, you need to send clear instructions on how the application
is started so that we can view the result.

If you have any questions about the assignment please don't hesitate to contact
Martin Lundberg, martin.lundberg@axis.com.

Good luck!

Team AVHS
