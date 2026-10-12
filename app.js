const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
  });
});

const chatbot = document.querySelector("[data-chatbot]");
const chatbotToggle = document.querySelector("[data-chatbot-toggle]");
if (chatbot && chatbotToggle) {
  chatbotToggle.addEventListener("click", () => chatbot.classList.toggle("open"));
}

function wireMobileNavMenu() {
  const navs = document.querySelectorAll(".site-nav");
  if (!navs.length) return;

  navs.forEach((nav) => {
    const linksContainer = nav.querySelector(".nav-links, .nav-center");
    if (!linksContainer) return;

    let actionContainer = nav.querySelector(".nav-right, .nav-actions");
    if (!actionContainer) {
      actionContainer = document.createElement("div");
      actionContainer.className = "nav-right";
      nav.appendChild(actionContainer);
    }

    const existingBurger = actionContainer.querySelector(".nav-burger-btn");
    if (existingBurger) return;

    const quickActionButton = actionContainer.querySelector(".nav-round:not(.nav-burger-btn)");
    if (quickActionButton instanceof HTMLButtonElement) {
      const desktopIcon = quickActionButton.textContent || "⌕";
      quickActionButton.dataset.desktopIcon = desktopIcon;
      quickActionButton.classList.add("nav-mobile-login-btn");
      const navLoginLink = nav.querySelector(".nav-login");
      quickActionButton.addEventListener("click", (event) => {
        if (window.innerWidth > 980 || !(navLoginLink instanceof HTMLAnchorElement)) return;
        event.preventDefault();
        navLoginLink.click();
      });
    }

    const burgerButton = document.createElement("button");
    burgerButton.type = "button";
    burgerButton.className = "nav-round nav-burger-btn";
    burgerButton.setAttribute("aria-label", "Toggle menu");
    burgerButton.setAttribute("aria-expanded", "false");
    burgerButton.textContent = "☰";
    actionContainer.appendChild(burgerButton);

    const mobilePanel = document.createElement("div");
    mobilePanel.className = "mobile-nav-panel";
    const mobileLinks = document.createElement("div");
    mobileLinks.className = "mobile-nav-links";
    linksContainer.querySelectorAll("a").forEach((link) => {
      mobileLinks.appendChild(link.cloneNode(true));
    });
    mobilePanel.appendChild(mobileLinks);

    const loginLink = nav.querySelector(".nav-login");
    if (loginLink instanceof HTMLAnchorElement) {
      const mobileLogin = loginLink.cloneNode(true);
      mobileLogin.classList.add("mobile-nav-login");
      mobilePanel.appendChild(mobileLogin);
    }

    nav.appendChild(mobilePanel);

    burgerButton.addEventListener("click", () => {
      const opening = !nav.classList.contains("mobile-open");
      nav.classList.toggle("mobile-open", opening);
      burgerButton.setAttribute("aria-expanded", String(opening));
    });

    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        burgerButton.setAttribute("aria-expanded", "false");
      });
    });
  });

  window.addEventListener("resize", () => {
    navs.forEach((nav) => {
      const quickActionButton = nav.querySelector(".nav-mobile-login-btn");
      if (!(quickActionButton instanceof HTMLButtonElement)) return;
      if (window.innerWidth <= 980) {
        quickActionButton.textContent = "👤";
        quickActionButton.setAttribute("aria-label", "Login / Register");
      } else {
        quickActionButton.textContent = quickActionButton.dataset.desktopIcon || "⌕";
        quickActionButton.setAttribute("aria-label", "Search");
      }
    });

    if (window.innerWidth > 980) {
      navs.forEach((nav) => {
        nav.classList.remove("mobile-open");
        const burger = nav.querySelector(".nav-burger-btn");
        if (burger) {
          burger.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  navs.forEach((nav) => {
    const quickActionButton = nav.querySelector(".nav-mobile-login-btn");
    if (!(quickActionButton instanceof HTMLButtonElement)) return;
    if (window.innerWidth <= 980) {
      quickActionButton.textContent = "👤";
      quickActionButton.setAttribute("aria-label", "Login / Register");
    } else {
      quickActionButton.textContent = quickActionButton.dataset.desktopIcon || "⌕";
      quickActionButton.setAttribute("aria-label", "Search");
    }
  });
}

wireMobileNavMenu();

function wireWorkspaceMobileSidebar() {
  const workspaces = document.querySelectorAll(".admin-workspace");
  if (!workspaces.length) return;

  workspaces.forEach((workspace) => {
    const sidebar = workspace.querySelector(".admin-sidebar");
    const pageTop = workspace.querySelector(".admin-page-top");
    if (!sidebar || !pageTop) return;

    if (workspace.querySelector(".workspace-mobile-menu-btn")) return;

    const actions = pageTop.querySelector(".admin-page-actions") || pageTop;
    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = "btn workspace-mobile-menu-btn";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
    actions.prepend(menuButton);

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "workspace-sidebar-backdrop";
    backdrop.setAttribute("aria-label", "Close navigation menu");
    workspace.appendChild(backdrop);

    const existingMobileLogout = sidebar.querySelector(".mobile-sidebar-logout");
    if (!existingMobileLogout) {
      const desktopLogout = pageTop.querySelector(
        '[data-admin-logout], [data-client-logout], [data-investor-logout]'
      );
      if (desktopLogout instanceof HTMLButtonElement) {
        const mobileLogout = document.createElement("button");
        mobileLogout.type = "button";
        mobileLogout.className = "btn mobile-sidebar-logout";
        mobileLogout.textContent = "Logout";
        mobileLogout.addEventListener("click", () => {
          desktopLogout.click();
        });
        sidebar.appendChild(mobileLogout);
      }
    }

    const closeSidebar = () => {
      workspace.classList.remove("sidebar-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const opening = !workspace.classList.contains("sidebar-open");
      workspace.classList.toggle("sidebar-open", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
    });

    backdrop.addEventListener("click", closeSidebar);
    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      workspaces.forEach((workspace) => {
        workspace.classList.remove("sidebar-open");
        const btn = workspace.querySelector(".workspace-mobile-menu-btn");
        if (btn instanceof HTMLButtonElement) {
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}

wireWorkspaceMobileSidebar();

const listingData = {
  "proton-x70": {
    name: "Proton X70 Premium",
    type: "SUV",
    seats: "5 seats",
    transmission: "Automatic",
    fuel: "Petrol",
    city: "Kuala Lumpur",
    day: 210,
    month: 4200,
    year: 46800,
    image: "./i ii living car1.avif",
    desc: "Comfortable mid-range SUV with roomy interior, ideal for family trips and intercity travel in Malaysia."
  },
  "honda-city": {
    name: "Honda City V",
    type: "Sedan",
    seats: "5 seats",
    transmission: "Automatic",
    fuel: "Petrol",
    city: "Petaling Jaya",
    day: 165,
    month: 3380,
    year: 37200,
    image: "./i ii living car2.avif",
    desc: "Efficient and practical sedan, perfect for daily commute, Grab driving, and weekend getaways."
  },
  "toyota-vios": {
    name: "Toyota Vios G",
    type: "Sedan",
    seats: "5 seats",
    transmission: "Automatic",
    fuel: "Petrol",
    city: "Johor Bahru",
    day: 170,
    month: 3450,
    year: 37800,
    image: "./i ii living car1.avif",
    desc: "Reliable sedan known for low maintenance and fuel savings, suitable for long-term rental plans."
  },
  "mazda-cx5": {
    name: "Mazda CX-5 Mid Spec",
    type: "SUV",
    seats: "5 seats",
    transmission: "Automatic",
    fuel: "Petrol",
    city: "Penang",
    day: 250,
    month: 4890,
    year: 53800,
    image: "./i ii living car2.avif",
    desc: "Premium-feel mid-range SUV for professionals who want comfort and stronger road presence."
  }
};

function renderCarDetails() {
  const holder = document.querySelector("[data-car-detail]");
  if (!holder) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "proton-x70";
  const car = listingData[id] || listingData["proton-x70"];

  const nameNode = holder.querySelector("[data-name]");
  const imageNode = holder.querySelector("[data-image]");
  const descNode = holder.querySelector("[data-desc]");
  const cityNode = holder.querySelector("[data-city]");
  const typeNode = holder.querySelector("[data-type]");
  const seatsNode = holder.querySelector("[data-seats]");
  const transmissionNode = holder.querySelector("[data-transmission]");
  const fuelNode = holder.querySelector("[data-fuel]");
  const dayNode = holder.querySelector("[data-day]");
  const monthNode = holder.querySelector("[data-month]");
  const yearNode = holder.querySelector("[data-year]");

  if (nameNode) nameNode.textContent = car.name;
  if (imageNode) {
    imageNode.src = car.image;
    imageNode.alt = car.name;
  }
  if (descNode) descNode.textContent = car.desc;
  if (cityNode) cityNode.textContent = car.city;
  if (typeNode) typeNode.textContent = car.type;
  if (seatsNode) seatsNode.textContent = car.seats;
  if (transmissionNode) transmissionNode.textContent = car.transmission;
  if (fuelNode) fuelNode.textContent = car.fuel;
  if (dayNode) dayNode.textContent = `RM ${car.day}/day`;
  if (monthNode) monthNode.textContent = `RM ${car.month}/month`;
  if (yearNode) yearNode.textContent = `RM ${car.year}/year`;
}

renderCarDetails();

function wireCardClicks() {
  document.querySelectorAll(".car-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("a, button")) return;
      const link = card.querySelector("a[href]");
      if (link && link instanceof HTMLAnchorElement) {
        window.location.href = link.href;
      }
    });
  });
}

function wireTypeCategoryClicks() {
  document.querySelectorAll(".type-card[data-category]").forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      if (!category) return;
      window.location.href = `./cars.html?category=${encodeURIComponent(category)}#car-categories`;
    });
  });
}

function syncCategoryFromQuery() {
  const chips = document.querySelectorAll("[data-category-chip]");
  if (!chips.length) return;
  const category = new URLSearchParams(window.location.search).get("category");
  chips.forEach((chip) => chip.classList.remove("dark"));
  const normalized = (category || "all").toLowerCase();
  const active = document.querySelector(`[data-category-chip="${normalized}"]`);
  if (active) {
    active.classList.add("dark");
  } else {
    const fallback = document.querySelector('[data-category-chip="all"]');
    if (fallback) fallback.classList.add("dark");
  }
}

wireCardClicks();
wireTypeCategoryClicks();
syncCategoryFromQuery();

const CLIENT_SESSION_KEY = "iiling-client-logged-in";
const CLIENT_SESSION_EMAIL_KEY = "iiling-client-email";
const CLIENT_SESSION_NAME_KEY = "iiling-client-name";
const INVESTOR_SESSION_KEY = "iiling-investor-logged-in";
const INVESTOR_SESSION_ID_KEY = "iiling-investor-id";
const INVESTOR_SESSION_NAME_KEY = "iiling-investor-name";
const ADMIN_SESSION_KEY = "iiling-admin-logged-in";
const ADMIN_SESSION_ID_KEY = "iiling-admin-id";
const ADMIN_SESSION_NAME_KEY = "iiling-admin-name";
const CLIENT_DEMO_ACCOUNT = Object.freeze({
  email: "customer",
  password: "Client@123",
  name: "Aina Rahman"
});
const INVESTOR_DEMO_ACCOUNT = Object.freeze({
  id: "investor",
  password: "123123",
  name: "Daniel Tan"
});
const ADMIN_DEMO_ACCOUNT = Object.freeze({
  id: "admin",
  password: "123123",
  name: "System Admin"
});

function setClientSession(account) {
  clearInvestorSession();
  clearAdminSession();
  localStorage.setItem(CLIENT_SESSION_KEY, "true");
  localStorage.setItem(CLIENT_SESSION_EMAIL_KEY, account.email);
  localStorage.setItem(CLIENT_SESSION_NAME_KEY, account.name);
}

function getClientSession() {
  const loggedIn = localStorage.getItem(CLIENT_SESSION_KEY) === "true";
  if (!loggedIn) return null;
  return {
    email: localStorage.getItem(CLIENT_SESSION_EMAIL_KEY) || CLIENT_DEMO_ACCOUNT.email,
    name: localStorage.getItem(CLIENT_SESSION_NAME_KEY) || CLIENT_DEMO_ACCOUNT.name
  };
}

function clearClientSession() {
  localStorage.removeItem(CLIENT_SESSION_KEY);
  localStorage.removeItem(CLIENT_SESSION_EMAIL_KEY);
  localStorage.removeItem(CLIENT_SESSION_NAME_KEY);
}

function setInvestorSession(account) {
  clearClientSession();
  clearAdminSession();
  localStorage.setItem(INVESTOR_SESSION_KEY, "true");
  localStorage.setItem(INVESTOR_SESSION_ID_KEY, account.id);
  localStorage.setItem(INVESTOR_SESSION_NAME_KEY, account.name);
}

function getInvestorSession() {
  const loggedIn = localStorage.getItem(INVESTOR_SESSION_KEY) === "true";
  if (!loggedIn) return null;
  return {
    id: localStorage.getItem(INVESTOR_SESSION_ID_KEY) || INVESTOR_DEMO_ACCOUNT.id,
    name: localStorage.getItem(INVESTOR_SESSION_NAME_KEY) || INVESTOR_DEMO_ACCOUNT.name
  };
}

function clearInvestorSession() {
  localStorage.removeItem(INVESTOR_SESSION_KEY);
  localStorage.removeItem(INVESTOR_SESSION_ID_KEY);
  localStorage.removeItem(INVESTOR_SESSION_NAME_KEY);
}

function setAdminSession(account) {
  clearClientSession();
  clearInvestorSession();
  localStorage.setItem(ADMIN_SESSION_KEY, "true");
  localStorage.setItem(ADMIN_SESSION_ID_KEY, account.id);
  localStorage.setItem(ADMIN_SESSION_NAME_KEY, account.name);
}

function getAdminSession() {
  const loggedIn = localStorage.getItem(ADMIN_SESSION_KEY) === "true";
  if (!loggedIn) return null;
  return {
    id: localStorage.getItem(ADMIN_SESSION_ID_KEY) || ADMIN_DEMO_ACCOUNT.id,
    name: localStorage.getItem(ADMIN_SESSION_NAME_KEY) || ADMIN_DEMO_ACCOUNT.name
  };
}

function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_SESSION_ID_KEY);
  localStorage.removeItem(ADMIN_SESSION_NAME_KEY);
}

function wireAuthModal() {
  const triggerSelector = 'a[href*="login.html"]';
  const triggers = document.querySelectorAll(triggerSelector);
  if (!triggers.length) return;

  const existing = document.querySelector("[data-auth-modal]");
  if (existing) {
    existing.remove();
  }

  const modal = document.createElement("div");
  modal.setAttribute("data-auth-modal", "true");
  modal.className = "auth-modal";
  modal.innerHTML = `
    <div class="auth-modal-backdrop" data-auth-close></div>
    <div class="auth-modal-panel" role="dialog" aria-modal="true" aria-label="Login and register options">
      <button type="button" class="auth-modal-close" data-auth-close aria-label="Close popup">×</button>
      <h3>Login / Register</h3>
      <p>Continue as customer or investor. This demo uses a popup instead of a dedicated login page.</p>
      <div class="auth-view" data-auth-view="login">
        <div class="auth-role-toggle" data-role-toggle>
          <button type="button" class="active">Customer</button>
          <button type="button">Investor</button>
          <button type="button">Admin</button>
        </div>
        <div class="auth-form-grid">
          <input class="input" type="text" placeholder="Login ID" data-auth-email />
          <input class="input" type="password" placeholder="Password" data-auth-password />
          <p class="auth-demo-hint" data-auth-demo-hint>Demo customer account: <strong>${CLIENT_DEMO_ACCOUNT.email}</strong> / <strong>${CLIENT_DEMO_ACCOUNT.password}</strong></p>
          <p class="auth-form-message auth-form-error" data-auth-error hidden></p>
          <button class="btn btn-dark" type="button" data-auth-login>Login</button>
        </div>
        <p class="auth-switch-text">
          New to i ii Living?
          <a href="#" class="auth-switch-link" data-open-register>Register</a>
        </p>
      </div>

      <div class="auth-view" data-auth-view="register" hidden>
        <div class="auth-role-toggle" data-role-toggle>
          <button type="button" class="active">Customer</button>
          <button type="button">Investor</button>
        </div>
        <div class="auth-form-grid auth-register-grid">
          <div class="auth-two-col">
            <input class="input" type="text" placeholder="First name" />
            <input class="input" type="text" placeholder="Last name" />
          </div>
          <input class="input" type="text" placeholder="IC number" />
          <input class="input" type="tel" placeholder="Contact number" />
          <label class="auth-file-field">
            <span>Attach identity card (front/back)</span>
            <input class="input" type="file" accept=".jpg,.jpeg,.png,.pdf" />
          </label>
          <p class="auth-form-message auth-form-success" data-auth-register-success hidden></p>
          <button class="btn btn-dark" type="button" data-auth-register-submit>Create account</button>
        </div>
        <p class="auth-switch-text">
          Already have an account?
          <a href="#" class="auth-switch-link" data-open-login>Login</a>
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const openModal = () => {
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  };

  const loginView = modal.querySelector('[data-auth-view="login"]');
  const registerView = modal.querySelector('[data-auth-view="register"]');
  const emailInput = modal.querySelector("[data-auth-email]");
  const passwordInput = modal.querySelector("[data-auth-password]");
  const errorNode = modal.querySelector("[data-auth-error]");
  const registerSuccessNode = modal.querySelector("[data-auth-register-success]");
  const demoHintNode = modal.querySelector("[data-auth-demo-hint]");
  const openRegisterLink = modal.querySelector("[data-open-register]");

  const getActiveRole = () => {
    const activeRole = modal.querySelector('[data-auth-view="login"] [data-role-toggle] button.active');
    return activeRole ? activeRole.textContent.trim().toLowerCase() : "customer";
  };

  const updateLoginHint = () => {
    if (!demoHintNode) return;
    const role = getActiveRole();
    if (role === "investor") {
      demoHintNode.innerHTML = `Demo investor account: <strong>${INVESTOR_DEMO_ACCOUNT.id}</strong> / <strong>${INVESTOR_DEMO_ACCOUNT.password}</strong>`;
    } else if (role === "admin") {
      demoHintNode.innerHTML = `Demo admin account: <strong>${ADMIN_DEMO_ACCOUNT.id}</strong> / <strong>${ADMIN_DEMO_ACCOUNT.password}</strong>`;
    } else {
      demoHintNode.innerHTML = `Demo customer account: <strong>${CLIENT_DEMO_ACCOUNT.email}</strong> / <strong>${CLIENT_DEMO_ACCOUNT.password}</strong>`;
    }
  };

  const updateRegisterAvailability = () => {
    if (!openRegisterLink) return;
    const role = getActiveRole();
    const isAdmin = role === "admin";
    openRegisterLink.classList.toggle("disabled", isAdmin);
    openRegisterLink.setAttribute("aria-disabled", isAdmin ? "true" : "false");
  };

  const clearMessages = () => {
    if (errorNode) {
      errorNode.textContent = "";
      errorNode.hidden = true;
    }
    if (registerSuccessNode) {
      registerSuccessNode.textContent = "";
      registerSuccessNode.hidden = true;
    }
  };

  const showLogin = () => {
    if (!loginView || !registerView) return;
    registerView.hidden = true;
    loginView.hidden = false;
    clearMessages();
    updateLoginHint();
    updateRegisterAvailability();
  };

  const showRegister = () => {
    if (!loginView || !registerView) return;
    loginView.hidden = true;
    registerView.hidden = false;
    clearMessages();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const redirectTarget = trigger.getAttribute("data-auth-redirect");
      const defaultRole = trigger.getAttribute("data-auth-default-role");
      if (redirectTarget) {
        modal.setAttribute("data-auth-redirect", redirectTarget);
      } else {
        modal.removeAttribute("data-auth-redirect");
      }
      if (defaultRole) {
        modal.setAttribute("data-auth-default-role", defaultRole.toLowerCase());
      } else {
        modal.removeAttribute("data-auth-default-role");
      }
      showLogin();
      const initialRole = modal.getAttribute("data-auth-default-role");
      if (initialRole) {
        modal.querySelectorAll("[data-role-toggle]").forEach((group) => {
          const buttons = group.querySelectorAll("button");
          buttons.forEach((btn) => {
            const isTarget = btn.textContent.trim().toLowerCase() === initialRole;
            btn.classList.toggle("active", isTarget);
          });
        });
        updateLoginHint();
      }
      openModal();
    });
  });

  modal.querySelectorAll("[data-auth-close]").forEach((node) => {
    node.addEventListener("click", closeModal);
  });

  modal.querySelectorAll("[data-open-register]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      if (getActiveRole() === "admin") {
        if (errorNode) {
          errorNode.textContent = "Admin account cannot be registered from this portal. Please login with admin credentials.";
          errorNode.hidden = false;
        }
        return;
      }
      showRegister();
    });
  });

  modal.querySelectorAll("[data-open-login]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      showLogin();
    });
  });

  modal.querySelectorAll("[data-role-toggle]").forEach((group) => {
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateLoginHint();
        updateRegisterAvailability();
      });
    });
  });

  const loginButton = modal.querySelector("[data-auth-login]");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement)) return;

      clearMessages();
      const role = getActiveRole();
      const enteredId = emailInput.value.trim().toLowerCase();
      const enteredPassword = passwordInput.value.trim();

      if (role === "admin") {
        const isAdminValid = enteredId === ADMIN_DEMO_ACCOUNT.id && enteredPassword === ADMIN_DEMO_ACCOUNT.password;
        if (!isAdminValid) {
          if (errorNode) {
            errorNode.textContent = "Incorrect admin ID or password. Please use the demo admin account shown above.";
            errorNode.hidden = false;
          }
          return;
        }
        setAdminSession(ADMIN_DEMO_ACCOUNT);
        const redirectUrl = modal.getAttribute("data-auth-redirect") || "./admin-portal.html";
        window.location.href = redirectUrl;
        return;
      }

      if (role === "investor") {
        const isInvestorValid =
          enteredId === INVESTOR_DEMO_ACCOUNT.id.toLowerCase() && enteredPassword === INVESTOR_DEMO_ACCOUNT.password;
        if (!isInvestorValid) {
          if (errorNode) {
            errorNode.textContent = "Incorrect investor ID or password. Please use the demo investor account shown above.";
            errorNode.hidden = false;
          }
          return;
        }
        setInvestorSession(INVESTOR_DEMO_ACCOUNT);
        const redirectUrl = modal.getAttribute("data-auth-redirect") || "./investor-portal.html";
        window.location.href = redirectUrl;
        return;
      }

      const isValid =
        enteredId === CLIENT_DEMO_ACCOUNT.email.toLowerCase() && enteredPassword === CLIENT_DEMO_ACCOUNT.password;

      if (!isValid) {
        if (errorNode) {
          errorNode.textContent = "Incorrect email or password. Please use the demo account shown above.";
          errorNode.hidden = false;
        }
        return;
      }

      setClientSession(CLIENT_DEMO_ACCOUNT);
      const redirectUrl = modal.getAttribute("data-auth-redirect") || "./client-portal.html";
      window.location.href = redirectUrl;
    });
  }

  const registerButton = modal.querySelector("[data-auth-register-submit]");
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      if (!registerSuccessNode) return;
      registerSuccessNode.textContent =
        "Registration submitted. In this demo, your account will be activated by admin review before first booking.";
      registerSuccessNode.hidden = false;
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

wireAuthModal();

function wireClientPortal() {
  const gate = document.querySelector("[data-client-gate]");
  const content = document.querySelector("[data-client-content]");
  if (!gate || !content) return;

  const nameNodes = document.querySelectorAll("[data-client-name]");
  const emailNode = document.querySelector("[data-client-email]");

  const render = () => {
    const session = getClientSession();
    const isAuthed = !!session;
    gate.hidden = isAuthed;
    content.hidden = !isAuthed;

    if (!session) return;
    nameNodes.forEach((node) => {
      node.textContent = session.name;
    });
    if (emailNode) {
      emailNode.textContent = session.email;
    }
  };

  document.querySelectorAll("[data-client-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      clearClientSession();
      window.location.href = "./index.html";
    });
  });

  document.querySelectorAll("[data-download-receipt]").forEach((button, index) => {
    button.addEventListener("click", () => {
      const session = getClientSession();
      if (!session) return;
      const receiptText = [
        "i ii Living - Booking Receipt (Demo)",
        "------------------------------------",
        `Customer: ${session.name}`,
        `Customer ID: ${session.email}`,
        `Booking Ref: IIL-${2026100 + index}`,
        "Status: Confirmed",
        "Payment: Deposit Received",
        "",
        "This is a demo receipt generated for prototype preview."
      ].join("\n");

      const blob = new Blob([receiptText], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `i-ii-ling-receipt-${index + 1}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    });
  });

  render();
}

wireClientPortal();

function wireInvestorPortal() {
  const gate = document.querySelector("[data-investor-gate]");
  const content = document.querySelector("[data-investor-content]");
  if (!gate || !content) return;

  const nameNodes = document.querySelectorAll("[data-investor-name]");
  const idNode = document.querySelector("[data-investor-id]");

  const render = () => {
    const session = getInvestorSession();
    const isAuthed = !!session;
    gate.hidden = isAuthed;
    content.hidden = !isAuthed;

    if (!session) return;
    nameNodes.forEach((node) => {
      node.textContent = session.name;
    });
    if (idNode) {
      idNode.textContent = session.id;
    }
  };

  document.querySelectorAll("[data-investor-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      clearInvestorSession();
      window.location.href = "./index.html";
    });
  });

  document.querySelectorAll("[data-download-payout]").forEach((button, index) => {
    button.addEventListener("click", () => {
      const session = getInvestorSession();
      if (!session) return;
      const payoutText = [
        "i ii Living - Investor Payout Record (Demo)",
        "-------------------------------------------",
        `Investor: ${session.name}`,
        `ID: ${session.id}`,
        `Payout Ref: INV-PAYOUT-${202610 + index}`,
        "Month: October 2026",
        "Amount: RM 2,000",
        "Status: Sent by admin",
        "",
        "This is a demo payout file generated for prototype preview."
      ].join("\n");

      const blob = new Blob([payoutText], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `i-ii-living-payout-${index + 1}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    });
  });

  render();
}

wireInvestorPortal();

function wireAdminPortal() {
  const gate = document.querySelector("[data-admin-gate]");
  const content = document.querySelector("[data-admin-content]");
  if (!gate || !content) return;

  const nameNodes = document.querySelectorAll("[data-admin-name]");
  const idNode = document.querySelector("[data-admin-id]");

  const render = () => {
    const session = getAdminSession();
    const isAuthed = !!session;
    gate.hidden = isAuthed;
    content.hidden = !isAuthed;

    if (!session) return;
    nameNodes.forEach((node) => {
      node.textContent = session.name;
    });
    if (idNode) {
      idNode.textContent = session.id;
    }
  };

  const salesByPeriod = {
    daily: { total: "RM 580", label: "Daily total", bars: [58, 33, 20] },
    monthly: { total: "RM 16,900", label: "Monthly projection", bars: [42, 75, 54] },
    yearly: { total: "RM 202,800", label: "Yearly projection", bars: [35, 66, 88] }
  };

  const periodTabs = document.querySelector("[data-admin-period-tabs]");
  const salesTotalNode = document.querySelector("[data-admin-sales-total]");
  const salesLabelNode = document.querySelector("[data-admin-sales-label]");
  const chartRows = document.querySelectorAll("[data-admin-sales-chart] .admin-chart-row i");
  if (periodTabs) {
    periodTabs.querySelectorAll("button[data-period]").forEach((button) => {
      button.addEventListener("click", () => {
        const period = button.getAttribute("data-period");
        if (!period || !salesByPeriod[period]) return;
        periodTabs.querySelectorAll("button").forEach((tab) => tab.classList.remove("active"));
        button.classList.add("active");
        const saleState = salesByPeriod[period];
        if (salesTotalNode) salesTotalNode.textContent = saleState.total;
        if (salesLabelNode) salesLabelNode.textContent = saleState.label;
        chartRows.forEach((bar, index) => {
          const width = saleState.bars[index] || 0;
          bar.style.width = `${width}%`;
        });
      });
    });
  }

  const vehicleFilter = document.querySelector("[data-admin-vehicle-filter]");
  const vehicleRows = document.querySelectorAll(".admin-table tbody tr[data-status]");
  if (vehicleFilter) {
    vehicleFilter.addEventListener("change", () => {
      const value = vehicleFilter.value;
      vehicleRows.forEach((row) => {
        const status = row.getAttribute("data-status");
        row.hidden = value !== "all" && status !== value;
      });
    });
  }

  document.querySelectorAll("[data-admin-edit-price]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      if (!row) return;
      const priceNode = row.querySelector("[data-rental-price]");
      if (!priceNode) return;
      const current = priceNode.textContent.replace(/[^0-9]/g, "");
      const nextPrice = window.prompt("Update rental price (RM/day):", current || "150");
      if (!nextPrice) return;
      const numeric = Number(nextPrice);
      if (!Number.isFinite(numeric) || numeric <= 0) return;
      priceNode.textContent = `RM ${Math.round(numeric)}`;
    });
  });

  const bookingSearch = document.querySelector("[data-admin-booking-search]");
  const bookingItems = document.querySelectorAll("[data-booking-item]");
  if (bookingSearch) {
    bookingSearch.addEventListener("input", () => {
      const q = bookingSearch.value.trim().toLowerCase();
      bookingItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.hidden = q.length > 0 && !text.includes(q);
      });
    });
  }

  const clientFilter = document.querySelector("[data-admin-client-filter]");
  const clientRows = document.querySelectorAll("[data-admin-client-list] .admin-mini-item");
  if (clientFilter) {
    clientFilter.addEventListener("change", () => {
      const filter = clientFilter.value;
      clientRows.forEach((row) => {
        const type = row.getAttribute("data-client-type");
        row.hidden = filter !== "all" && type !== filter;
      });
    });
  }

  const pendingNode = document.querySelector("[data-admin-pending-count]");
  let pending = pendingNode ? Number(pendingNode.textContent) || 0 : 0;
  document.querySelectorAll("[data-admin-approve-client]").forEach((button) => {
    button.addEventListener("click", () => {
      button.disabled = true;
      button.textContent = "Approved";
      button.classList.remove("btn-dark");
      const row = button.closest(".admin-mini-item");
      if (row) {
        let status = row.querySelector(".admin-tag.success");
        if (!status) {
          status = document.createElement("span");
          status.className = "admin-tag success";
          status.textContent = "Verified";
          row.appendChild(status);
        }
      }
      if (pendingNode && pending > 0) {
        pending -= 1;
        pendingNode.textContent = String(pending);
      }
    });
  });

  const notificationList = document.querySelector("[data-admin-notification-list]");
  const notificationCount = document.querySelector("[data-admin-notification-count]");
  if (notificationList && notificationCount) {
    const syncUnreadCount = () => {
      const all = notificationList.querySelectorAll('input[type="checkbox"]');
      const unread = Array.from(all).filter((box) => !(box instanceof HTMLInputElement && box.checked)).length;
      notificationCount.textContent = `${unread} unread`;
    };
    notificationList.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.addEventListener("change", syncUnreadCount);
    });
    syncUnreadCount();
  }

  const invoiceBooking = document.querySelector("[data-admin-invoice-booking]");
  const invoiceAmount = document.querySelector("[data-admin-invoice-amount]");
  const invoiceList = document.querySelector("[data-admin-invoice-list]");
  const generateInvoice = document.querySelector("[data-admin-generate-invoice]");
  if (generateInvoice && invoiceList && invoiceBooking && invoiceAmount) {
    generateInvoice.addEventListener("click", () => {
      const bookingId = invoiceBooking.value.trim();
      const amount = Number(invoiceAmount.value);
      if (!bookingId || !Number.isFinite(amount) || amount <= 0) return;

      const item = document.createElement("div");
      item.className = "admin-mini-item";
      item.innerHTML = `
        <div>
          <h4>EINV-${Math.floor(100000 + Math.random() * 900000)}</h4>
          <p>Booking ${bookingId} · RM ${Math.round(amount)}</p>
        </div>
        <span class="admin-tag success">Generated</span>
      `;
      invoiceList.prepend(item);
      invoiceBooking.value = "";
      invoiceAmount.value = "";
    });
  }

  document.querySelectorAll("[data-admin-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      clearAdminSession();
      window.location.href = "./index.html";
    });
  });

  document.querySelectorAll("[data-download-sales-report]").forEach((button, index) => {
    button.addEventListener("click", () => {
      const session = getAdminSession();
      if (!session) return;
      const reportText = [
        "i ii Living - Admin Sales Report (Demo)",
        "---------------------------------------",
        `Generated by: ${session.name} (${session.id})`,
        `Report Ref: ADM-SALES-${202610 + index}`,
        "Period: October 2026",
        "Daily: RM 580",
        "Monthly: RM 16,900",
        "Yearly projection: RM 202,800",
        "",
        "This is a demo export for prototype preview."
      ].join("\n");

      const blob = new Blob([reportText], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `i-ii-living-admin-sales-report-${index + 1}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    });
  });

  render();
}

wireAdminPortal();