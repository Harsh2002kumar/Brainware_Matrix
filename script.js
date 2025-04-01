document.addEventListener("DOMContentLoaded", function () {
  // Sample data for demonstration
  const samplePosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      author: "Jane Doe",
      date: "March 28, 2025",
      excerpt:
        "Learn the basics of HTML, CSS, and JavaScript to start your web development journey.",
      image: "/api/placeholder/600/400",
      content:
        "Web development is an exciting field with endless possibilities. This post will guide you through the fundamental concepts and tools you need to get started.",
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence",
      author: "John Smith",
      date: "March 25, 2025",
      excerpt:
        "Exploring how AI is reshaping industries and what to expect in the coming years.",
      image: "/api/placeholder/600/400",
      content:
        "Artificial Intelligence has come a long way in recent years. From machine learning to neural networks, AI is transforming how we live and work.",
    },
    {
      id: 3,
      title: "Mastering CSS Grid Layout",
      author: "Alex Johnson",
      date: "March 20, 2025",
      excerpt:
        "A comprehensive guide to using CSS Grid for modern web layouts.",
      image: "/api/placeholder/600/400",
      content:
        "CSS Grid Layout is a powerful tool for creating complex web layouts. In this post, we'll explore how to use it effectively.",
    },
  ];

  const sampleUsers = [
    {
      id: 1,
      username: "janedoe",
      email: "jane@example.com",
      password: "password123", // In a real app, this would be hashed
    },
    {
      id: 2,
      username: "johnsmith",
      email: "john@example.com",
      password: "password123",
    },
  ];

  const sampleComments = [
    {
      id: 1,
      postId: 1,
      author: "John Smith",
      date: "March 29, 2025",
      content: "Great article! This really helped me understand the basics.",
    },
    {
      id: 2,
      postId: 1,
      author: "Sarah Wilson",
      date: "March 30, 2025",
      content:
        "I've been struggling with CSS for a while. Your explanation made it much clearer.",
    },
  ];

  // Current user state
  let currentUser = null;

  // Helper functions
  function renderPosts() {
    const postsContainer = document.querySelector(".posts");
    if (!postsContainer) return;

    postsContainer.innerHTML = "";

    samplePosts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.className = "post-card";
      postCard.innerHTML = `
              <img src="${post.image}" alt="${post.title}" class="post-image">
              <div class="post-content">
                  <h2 class="post-title"><a href="#" data-post-id="${post.id}">${post.title}</a></h2>
                  <div class="post-meta">
                      <img src="/api/placeholder/60/60" alt="${post.author}" class="author-avatar">
                      <span>${post.author} • ${post.date}</span>
                  </div>
                  <p class="post-excerpt">${post.excerpt}</p>
                  <a href="#" class="btn" data-post-id="${post.id}">Read More</a>
              </div>
          `;
      postsContainer.appendChild(postCard);

      // Add event listener to the "Read More" button
      const readMoreBtn = postCard.querySelector(".btn");
      readMoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const postId = this.getAttribute("data-post-id");
        showSinglePost(postId);
      });

      // Add event listener to the post title
      const postTitle = postCard.querySelector(".post-title a");
      postTitle.addEventListener("click", function (e) {
        e.preventDefault();
        const postId = this.getAttribute("data-post-id");
        showSinglePost(postId);
      });
    });
  }

  function showSinglePost(postId) {
    const post = samplePosts.find((p) => p.id == postId);
    const mainContent = document.querySelector("main .container");

    if (post) {
      // Save current scroll position
      const scrollPosition = window.scrollY;

      // Change URL without page reload (for demonstration)
      window.history.pushState({}, "", `?post=${postId}`);

      mainContent.innerHTML = `
              <div class="single-post">
                  <div class="post-header">
                      <h1>${post.title}</h1>
                      <div class="post-meta">
                          <img src="/api/placeholder/60/60" alt="${
                            post.author
                          }" class="author-avatar">
                          <span>${post.author} • ${post.date}</span>
                      </div>
                  </div>
                  <img src="${post.image}" alt="${
        post.title
      }" class="full-width-img">
                  <div class="post-body">
                      <p>${post.content}</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius fringilla felis. Donec semper, ipsum in luctus commodo, tellus orci gravida turpis, non pharetra tortor enim id purus.</p>
                      <p>Nullam ornare, nulla eget gravida venenatis, libero tellus dignissim nisi, vel malesuada risus ex eget orci. Sed pulvinar nibh quam, non gravida purus dictum a.</p>
                  </div>
                  ${
                    currentUser
                      ? `
                      <div class="post-actions">
                          <a href="#" class="btn btn-secondary edit-post-btn" data-post-id="${post.id}">Edit Post</a>
                          <a href="#" class="btn btn-secondary delete-post-btn" data-post-id="${post.id}">Delete Post</a>
                      </div>
                  `
                      : ""
                  }
              </div>
              
              <div class="comments-section">
                  <h2 class="comments-title">Comments</h2>
                  <div class="comments-list"></div>
                  
                  ${
                    currentUser
                      ? `
                      <div class="comment-form">
                          <h3>Leave a Comment</h3>
                          <form id="add-comment-form">
                              <div class="form-group">
                                  <textarea class="form-control" id="comment-content" placeholder="Write your comment..."></textarea>
                              </div>
                              <button type="submit" class="btn">Submit Comment</button>
                          </form>
                      </div>
                  `
                      : `
                      <div class="login-to-comment">
                          <p>Please <a href="#" class="show-login-form">login</a> to leave a comment.</p>
                      </div>
                  `
                  }
              </div>
              
              <a href="#" class="btn back-to-posts">Back to Posts</a>
          `;

      // Render comments for this post
      renderComments(postId);

      // Add event listener to the back button
      const backBtn = document.querySelector(".back-to-posts");
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showHomePage();
      });

      // Add event listener to the login link if user is not logged in
      if (!currentUser) {
        const loginLink = document.querySelector(".show-login-form");
        if (loginLink) {
          loginLink.addEventListener("click", function (e) {
            e.preventDefault();
            showLoginForm();
          });
        }
      }

      // Add event listeners to edit and delete buttons if user is logged in
      if (currentUser) {
        const editBtn = document.querySelector(".edit-post-btn");
        if (editBtn) {
          editBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const postId = this.getAttribute("data-post-id");
            showEditPostForm(postId);
          });
        }

        const deleteBtn = document.querySelector(".delete-post-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const postId = this.getAttribute("data-post-id");
            if (confirm("Are you sure you want to delete this post?")) {
              deletePost(postId);
            }
          });
        }

        // Add event listener to the comment form
        const commentForm = document.getElementById("add-comment-form");
        if (commentForm) {
          commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const commentContent =
              document.getElementById("comment-content").value;
            if (commentContent.trim() !== "") {
              addComment(postId, commentContent);
              document.getElementById("comment-content").value = "";
            }
          });
        }
      }

      // Scroll to top
      window.scrollTo(0, 0);
    }
  }

  function renderComments(postId) {
    const commentsContainer = document.querySelector(".comments-list");
    if (!commentsContainer) return;

    const postComments = sampleComments.filter((c) => c.postId == postId);

    if (postComments.length === 0) {
      commentsContainer.innerHTML =
        "<p>No comments yet. Be the first to comment!</p>";
      return;
    }

    commentsContainer.innerHTML = "";

    postComments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerHTML = `
              <div class="comment-meta">
                  <img src="/api/placeholder/40/40" alt="${comment.author}" class="author-avatar">
                  <span>${comment.author} • ${comment.date}</span>
              </div>
              <div class="comment-content">
                  <p>${comment.content}</p>
              </div>
          `;
      commentsContainer.appendChild(commentElement);
    });
  }

  function addComment(postId, content) {
    // In a real app, this would be a server request
    const newComment = {
      id: sampleComments.length + 1,
      postId: parseInt(postId),
      author: currentUser.username,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: content,
    };

    sampleComments.push(newComment);
    renderComments(postId);
  }

  function showHomePage() {
    // Change URL without page reload
    window.history.pushState({}, "", "/");

    const mainContent = document.querySelector("main .container");
    mainContent.innerHTML = `
          <div class="hero">
              <h1>Welcome to BlogSphere</h1>
              <p>Share your thoughts, gain knowledge, and connect with others through the power of blogging.</p>
              ${
                currentUser
                  ? `<a href="#" class="btn create-post-btn">Create New Post</a>`
                  : `<a href="#" class="btn show-login-form">Sign Up Now</a>`
              }
          </div>
          
          <h2>Latest Posts</h2>
          <div class="posts"></div>
      `;

    renderPosts();

    // Add event listener to the create post button if user is logged in
    if (currentUser) {
      const createPostBtn = document.querySelector(".create-post-btn");
      if (createPostBtn) {
        createPostBtn.addEventListener("click", function (e) {
          e.preventDefault();
          showCreatePostForm();
        });
      }
    } else {
      const loginBtn = document.querySelector(".show-login-form");
      if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
          e.preventDefault();
          showLoginForm();
        });
      }
    }
  }

  function showLoginForm() {
    const mainContent = document.querySelector("main .container");
    mainContent.innerHTML = `
          <div class="auth-container">
              <h2 class="auth-title">Login</h2>
              <form id="login-form">
                  <div class="form-group">
                      <label for="username">Username or Email</label>
                      <input type="text" id="username" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" class="form-control" required>
                  </div>
                  <button type="submit" class="btn btn-block">Login</button>
              </form>
              <div class="form-footer">
                  <p>Don't have an account? <a href="#" class="show-register-form">Sign up</a></p>
              </div>
          </div>
      `;

    // Add event listener to the login form
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulate login (in a real app, this would be a server request)
      const user = sampleUsers.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (user) {
        currentUser = user;
        updateAuthUI();
        showHomePage();
      } else {
        alert("Invalid username or password");
      }
    });

    // Add event listener to the register link
    const registerLink = document.querySelector(".show-register-form");
    registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      showRegisterForm();
    });
  }

  function showRegisterForm() {
    const mainContent = document.querySelector("main .container");
    mainContent.innerHTML = `
          <div class="auth-container">
              <h2 class="auth-title">Create an Account</h2>
              <form id="register-form">
                  <div class="form-group">
                      <label for="reg-username">Username</label>
                      <input type="text" id="reg-username" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="reg-email">Email</label>
                      <input type="email" id="reg-email" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="reg-password">Password</label>
                      <input type="password" id="reg-password" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="reg-confirm-password">Confirm Password</label>
                      <input type="password" id="reg-confirm-password" class="form-control" required>
                  </div>
                  <button type="submit" class="btn btn-block">Sign Up</button>
              </form>
              <div class="form-footer">
                  <p>Already have an account? <a href="#" class="show-login-form">Login</a></p>
              </div>
          </div>
      `;

    // Add event listener to the register form
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("reg-username").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      const confirmPassword = document.getElementById(
        "reg-confirm-password"
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Check if username or email already exists
      const existingUser = sampleUsers.find(
        (u) => u.username === username || u.email === email
      );

      if (existingUser) {
        alert("Username or email already exists");
        return;
      }

      // Simulate registration (in a real app, this would be a server request)
      const newUser = {
        id: sampleUsers.length + 1,
        username: username,
        email: email,
        password: password,
      };

      sampleUsers.push(newUser);
      currentUser = newUser;
      updateAuthUI();
      showHomePage();
    });

    // Add event listener to the login link
    const loginLink = document.querySelector(".show-login-form");
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      showLoginForm();
    });
  }

  function showCreatePostForm() {
    const mainContent = document.querySelector("main .container");
    mainContent.innerHTML = `
          <div class="editor-container">
              <h2 class="editor-title">Create New Post</h2>
              <form id="create-post-form">
                  <div class="form-group">
                      <label for="post-title">Title</label>
                      <input type="text" id="post-title" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="post-excerpt">Excerpt</label>
                      <textarea id="post-excerpt" class="form-control" required></textarea>
                  </div>
                  <div class="form-group">
                      <label for="post-content">Content</label>
                      <textarea id="post-content" class="form-control" rows="10" required></textarea>
                  </div>
                  <button type="submit" class="btn">Publish Post</button>
                  <a href="#" class="btn btn-secondary cancel-btn">Cancel</a>
              </form>
          </div>
      `;

    // Add event listener to the create post form
    const createPostForm = document.getElementById("create-post-form");
    createPostForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("post-title").value;
      const excerpt = document.getElementById("post-excerpt").value;
      const content = document.getElementById("post-content").value;

      // Simulate post creation (in a real app, this would be a server request)
      const newPost = {
        id: samplePosts.length + 1,
        title: title,
        author: currentUser.username,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        excerpt: excerpt,
        content: content,
        image: "/api/placeholder/600/400",
      };

      samplePosts.push(newPost);
      showHomePage();
    });

    // Add event listener to the cancel button
    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showHomePage();
    });
  }

  function showEditPostForm(postId) {
    const post = samplePosts.find((p) => p.id == postId);

    if (post) {
      const mainContent = document.querySelector("main .container");
      mainContent.innerHTML = `
              <div class="editor-container">
                  <h2 class="editor-title">Edit Post</h2>
                  <form id="edit-post-form">
                      <div class="form-group">
                          <label for="post-title">Title</label>
                          <input type="text" id="post-title" class="form-control" value="${post.title}" required>
                      </div>
                      <div class="form-group">
                          <label for="post-excerpt">Excerpt</label>
                          <textarea id="post-excerpt" class="form-control" required>${post.excerpt}</textarea>
                      </div>
                      <div class="form-group">
                          <label for="post-content">Content</label>
                          <textarea id="post-content" class="form-control" rows="10" required>${post.content}</textarea>
                      </div>
                      <button type="submit" class="btn">Update Post</button>
                      <a href="#" class="btn btn-secondary cancel-btn">Cancel</a>
                  </form>
              </div>
          `;

      // Add event listener to the edit post form
      const editPostForm = document.getElementById("edit-post-form");
      editPostForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("post-title").value;
        const excerpt = document.getElementById("post-excerpt").value;
        const content = document.getElementById("post-content").value;

        // Update the post
        post.title = title;
        post.excerpt = excerpt;
        post.content = content;

        showSinglePost(postId);
      });

      // Add event listener to the cancel button
      const cancelBtn = document.querySelector(".cancel-btn");
      cancelBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showSinglePost(postId);
      });
    }
  }

  function deletePost(postId) {
    // Remove the post from the array
    const postIndex = samplePosts.findIndex((p) => p.id == postId);
    if (postIndex !== -1) {
      samplePosts.splice(postIndex, 1);
      showHomePage();
    }
  }

  function updateAuthUI() {
    const authNav = document.querySelector(".auth-nav");

    if (currentUser) {
      authNav.innerHTML = `
              <span>Welcome, ${currentUser.username}!</span>
              <a href="#" class="btn create-post-nav-btn">Create Post</a>
              <a href="#" class="btn btn-secondary logout-btn">Logout</a>
          `;

      // Add event listener to the create post button
      const createPostBtn = document.querySelector(".create-post-nav-btn");
      createPostBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showCreatePostForm();
      });

      // Add event listener to the logout button
      const logoutBtn = document.querySelector(".logout-btn");
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentUser = null;
        updateAuthUI();
        showHomePage();
      });
    } else {
      authNav.innerHTML = `
              <a href="#" class="login-btn">Login</a>
              <a href="#" class="btn register-btn">Sign Up</a>
          `;

      // Add event listener to the login button
      const loginBtn = document.querySelector(".login-btn");
      loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showLoginForm();
      });

      // Add event listener to the register button
      const registerBtn = document.querySelector(".register-btn");
      registerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showRegisterForm();
      });
    }
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector("nav ul");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  // Initialize the app
  updateAuthUI();
  showHomePage();

  // Check URL for post ID (for direct links)
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post");

  if (postId) {
    showSinglePost(postId);
  }
});
