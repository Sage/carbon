import React from "react";
import {
  ResponsiveVerticalMenu,
  ResponsiveVerticalMenuItem,
  ResponsiveVerticalMenuProps,
  ResponsiveVerticalMenuProvider,
} from ".";

import Box from "../../box";
import GlobalHeader from "../../global-header";
import Hr from "../../hr";
import Typography from "../../typography";

export default {
  title: "Vertical Menu/Responsive/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const CustomPayrollIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.7358 0H3.26418C1.46142 0 0 1.46142 0 3.26418V24.7358C0 26.5386 1.46142 28 3.26418 28H24.7358C26.5386 28 28 26.5386 28 24.7358V3.26418C28 1.46142 26.5386 0 24.7358 0Z"
      fill="black"
    />
    <path
      d="M18.532 22.1665C19.4985 22.1665 20.282 21.383 20.282 20.4165C20.282 19.45 19.4985 18.6665 18.532 18.6665C17.5655 18.6665 16.782 19.45 16.782 20.4165C16.782 21.383 17.5655 22.1665 18.532 22.1665Z"
      fill="#00D639"
    />
    <path
      d="M13.1199 5.83325C12.969 5.83325 12.8352 5.92988 12.7877 6.07305L7.60138 21.7064C7.52623 21.9329 7.69489 22.1666 7.93358 22.1666H14.6109C14.7617 22.1666 14.8956 22.07 14.9431 21.9268L20.1294 6.29346C20.2045 6.06691 20.0359 5.83325 19.7972 5.83325H13.1199Z"
      fill="white"
    />
  </svg>
);

const CustomAccountingIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.7358 0H3.26418C1.46142 0 0 1.46142 0 3.26418V24.7358C0 26.5386 1.46142 28 3.26418 28H24.7358C26.5386 28 28 26.5386 28 24.7358V3.26418C28 1.46142 26.5386 0 24.7358 0Z"
      fill="black"
    />
    <path
      d="M5.92137 15.8727C6.95575 15.8727 7.79427 15.0341 7.79427 13.9997C7.79427 12.9654 6.95575 12.1268 5.92137 12.1268C4.88699 12.1268 4.04846 12.9654 4.04846 13.9997C4.04846 15.0341 4.88699 15.8727 5.92137 15.8727Z"
      fill="white"
    />
    <path
      d="M22.0786 15.8727C23.113 15.8727 23.9515 15.0341 23.9515 13.9997C23.9515 12.9654 23.113 12.1268 22.0786 12.1268C21.0442 12.1268 20.2057 12.9654 20.2057 13.9997C20.2057 15.0341 21.0442 15.8727 22.0786 15.8727Z"
      fill="white"
    />
    <path
      d="M8.2874 21.5855C9.32178 21.5855 10.1603 20.747 10.1603 19.7126C10.1603 18.6782 9.32178 17.8397 8.2874 17.8397C7.25303 17.8397 6.4145 18.6782 6.4145 19.7126C6.4145 20.747 7.25303 21.5855 8.2874 21.5855Z"
      fill="white"
    />
    <path
      d="M19.7126 10.1603C20.7469 10.1603 21.5855 9.32182 21.5855 8.28744C21.5855 7.25306 20.7469 6.41453 19.7126 6.41453C18.6782 6.41453 17.8397 7.25306 17.8397 8.28744C17.8397 9.32182 18.6782 10.1603 19.7126 10.1603Z"
      fill="white"
    />
    <path
      d="M13.9997 23.9515C15.0341 23.9515 15.8726 23.113 15.8726 22.0786C15.8726 21.0443 15.0341 20.2057 13.9997 20.2057C12.9653 20.2057 12.1268 21.0443 12.1268 22.0786C12.1268 23.113 12.9653 23.9515 13.9997 23.9515Z"
      fill="white"
    />
    <path
      d="M13.9997 7.79427C15.0341 7.79427 15.8726 6.95575 15.8726 5.92137C15.8726 4.88699 15.0341 4.04846 13.9997 4.04846C12.9653 4.04846 12.1268 4.88699 12.1268 5.92137C12.1268 6.95575 12.9653 7.79427 13.9997 7.79427Z"
      fill="white"
    />
    <path
      d="M19.7126 21.5855C20.7469 21.5855 21.5855 20.747 21.5855 19.7126C21.5855 18.6782 20.7469 17.8397 19.7126 17.8397C18.6782 17.8397 17.8397 18.6782 17.8397 19.7126C17.8397 20.747 18.6782 21.5855 19.7126 21.5855Z"
      fill="white"
    />
    <path
      d="M8.2874 10.1603C9.32178 10.1603 10.1603 9.32182 10.1603 8.28744C10.1603 7.25306 9.32178 6.41453 8.2874 6.41453C7.25303 6.41453 6.4145 7.25306 6.4145 8.28744C6.4145 9.32182 7.25303 10.1603 8.2874 10.1603Z"
      fill="white"
    />
    <path
      d="M13.9997 15.8726C15.0341 15.8726 15.8726 15.0341 15.8726 13.9997C15.8726 12.9654 15.0341 12.1268 13.9997 12.1268C12.9654 12.1268 12.1268 12.9654 12.1268 13.9997C12.1268 15.0341 12.9654 15.8726 13.9997 15.8726Z"
      fill="#00D639"
    />
  </svg>
);

export const Default = (props: Partial<ResponsiveVerticalMenuProps>) => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenuProvider>
        <ResponsiveVerticalMenu {...props}>
          <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
          <Hr m={0} />
          <ResponsiveVerticalMenuItem
            customIcon={<CustomAccountingIcon />}
            id="accounting"
            label="Accounting"
          />
          <ResponsiveVerticalMenuItem id="accounting-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="accounting-sales" label="Sales">
            <ResponsiveVerticalMenuItem
              disableIconSpacing
              id="quotes-and-estimates"
              label="Quotes & Estimates"
              href="#"
            />
            <ResponsiveVerticalMenuItem
              disableIconSpacing
              id="new-sales-invoice"
              label="New Sales Invoice"
              href="#"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem id="contact" label="Contacts" />
          <ResponsiveVerticalMenuItem
            id="products-and-services"
            label="Products & Services"
          />
          <Hr m={0} />
          <ResponsiveVerticalMenuItem
            customIcon={<CustomPayrollIcon />}
            id="payroll"
            label="Payroll"
          />
          <ResponsiveVerticalMenuItem id="payroll-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="payroll-sales" label="Sales">
            <ResponsiveVerticalMenuItem
              disableIconSpacing
              id="menu-item-1"
              label="Menu Item 1"
              href="#"
            >
              <ResponsiveVerticalMenuItem
                id="menu-item-3"
                label="Menu Item 3"
                disableIconSpacing
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuItem
              disableIconSpacing
              id="menu-item-2"
              label="Menu Item 2"
              href="#"
            >
              <ResponsiveVerticalMenuItem
                id="menu-item-4"
                label="Menu Item 4"
                disableIconSpacing
              />
            </ResponsiveVerticalMenuItem>
            {/* <ResponsiveVerticalMenuItem
              id="menu-item-5"
              label="Menu Item 5"
              disableIconSpacing
            /> */}
          </ResponsiveVerticalMenuItem>
          <Hr m={0} />
          <Box
            width="92%"
            p="0 16px"
            color="white"
            display="flex"
            flexDirection="column"
          >
            <Typography
              fontWeight="500"
              fontSize="16px"
              color="var(--colorsGray700)"
              my={1}
            >
              Profile
            </Typography>
          </Box>
          <ResponsiveVerticalMenuItem
            id="my-profile"
            label="My Profile"
            disableIconSpacing
          />
          <ResponsiveVerticalMenuItem
            id="logout"
            label="Log out"
            disableIconSpacing
          />
          <Hr m={0} />
          <ResponsiveVerticalMenuItem
            id="manage-business-account"
            label="Manage Business Account"
            disableIconSpacing
          />
          <ResponsiveVerticalMenuItem
            id="manage-users"
            label="Manage Users"
            disableIconSpacing
          />
          <Hr m={0} />
          <Box
            width="92%"
            p="0 16px"
            color="white"
            display="flex"
            flexDirection="column"
          >
            <Typography
              fontWeight="500"
              fontSize="16px"
              color="var(--colorsGray700)"
              my={1}
            >
              Help
            </Typography>
          </Box>
          <ResponsiveVerticalMenuItem
            id="help"
            label="Help Centre"
            disableIconSpacing
          />
          <ResponsiveVerticalMenuItem
            id="chat"
            label="Chat"
            disableIconSpacing
          />
          <ResponsiveVerticalMenuItem
            id="feedback"
            label="Give feedback"
            disableIconSpacing
          />
        </ResponsiveVerticalMenu>
      </ResponsiveVerticalMenuProvider>
    </GlobalHeader>
  );
};

Default.storyName = "default";
