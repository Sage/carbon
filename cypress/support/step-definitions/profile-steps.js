import {
  emailPreview,
  avatarPreview,
  namePreview,
} from "../../locators/profile";

Then("email is set to {word}", (email) => {
  emailPreview().should("have.text", email);
});

Then("avatar is taken from {string}", (avatarUrl) => {
  avatarPreview().should("have.attr", "src", avatarUrl);
});

Then("name is set to {word}", (name) => {
  namePreview().should("have.text", name);
});
