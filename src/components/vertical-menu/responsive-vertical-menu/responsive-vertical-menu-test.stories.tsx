import React, { useEffect, useState } from "react";

import {
  ResponsiveVerticalMenu,
  ResponsiveVerticalMenuDivider,
  ResponsiveVerticalMenuItem,
  ResponsiveVerticalMenuProps,
} from ".";

import Box from "../../box";
import GlobalHeader from "../../global-header";
import Icon from "../../icon";
import Loader from "../../loader";
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
      <ResponsiveVerticalMenu {...props}>
        <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          customIcon={<CustomAccountingIcon />}
          id="accounting"
          label="Accounting"
        >
          <ResponsiveVerticalMenuItem id="summary" label="Summary" />
          <ResponsiveVerticalMenuItem
            id="sales-invoices"
            label="Sales Invoices"
          >
            <ResponsiveVerticalMenuItem
              id="quotes-and-estimates"
              label="Quotes & Estimates"
              href="#"
            />
            <ResponsiveVerticalMenuItem
              id="new-sales-invoice"
              label="New Sales Invoice"
              href="#"
            />
            <ResponsiveVerticalMenuItem
              id="sales-summary"
              label="Sales Summary"
              href="#"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem id="contacts" label="Contacts">
            <ResponsiveVerticalMenuItem
              id="nested-menu-item-1"
              label="Nested Menu Item 1"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            id="products-and-services"
            label="Products & Services"
          />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="payroll" label="Payroll">
          <ResponsiveVerticalMenuItem id="payroll-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="payroll-sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="profile" label="Profile">
          <ResponsiveVerticalMenuItem
            id="profile-my-profile"
            label="My Profile"
          />
          <ResponsiveVerticalMenuItem id="profile-logout" label="Log out" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          id="manage-business-account"
          label="Manage Business Account"
        />
        <ResponsiveVerticalMenuItem id="manage-users" label="Manage Users" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="help" label="Help">
          <ResponsiveVerticalMenuItem
            id="help-centre"
            label={
              <Box display="flex" width="100%" alignItems="center" gap={1}>
                <span>Help Centre</span>
                <Icon type="link" />
              </Box>
            }
          />
          <ResponsiveVerticalMenuItem id="help-chat" label="Chat" />
          <ResponsiveVerticalMenuItem
            id="help-feedback"
            label="Give feedback"
          />
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
Default.storyName = "Default";

export const WithoutGlobalHeader = (
  props: Partial<ResponsiveVerticalMenuProps>,
) => {
  return (
    <ResponsiveVerticalMenu {...props}>
      <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
      <ResponsiveVerticalMenuDivider />
      <ResponsiveVerticalMenuItem
        customIcon={<CustomAccountingIcon />}
        id="accounting"
        label="Accounting"
      >
        <ResponsiveVerticalMenuItem id="summary" label="Summary" />
        <ResponsiveVerticalMenuItem id="sales-invoices" label="Sales Invoices">
          <ResponsiveVerticalMenuItem
            id="quotes-and-estimates"
            label="Quotes & Estimates"
            href="#"
          />
          <ResponsiveVerticalMenuItem
            id="new-sales-invoice"
            label="New Sales Invoice"
            href="#"
          />
          <ResponsiveVerticalMenuItem
            id="sales-summary"
            label="Sales Summary"
            href="#"
          />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem id="contacts" label="Contacts">
          <ResponsiveVerticalMenuItem
            id="nested-menu-item-1"
            label="Nested Menu Item 1"
          />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem
          id="products-and-services"
          label="Products & Services"
        />
      </ResponsiveVerticalMenuItem>
    </ResponsiveVerticalMenu>
  );
};
WithoutGlobalHeader.storyName = "Without Global Header";

export const WithFullIcons = (props: Partial<ResponsiveVerticalMenuProps>) => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenu {...props}>
        <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          customIcon={<CustomAccountingIcon />}
          id="accounting"
          label="Accounting"
        />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          id="payroll"
          label="Payroll"
          icon="business"
        >
          <ResponsiveVerticalMenuItem id="payroll-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="payroll-sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          icon="home"
          id="primary-menu"
          label={
            <Box display="flex" width="100%" alignItems="center" gap={1}>
              <span>Primary Menu Item</span>
              <Icon type="link" />
            </Box>
          }
        >
          <ResponsiveVerticalMenuItem id="sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem
          icon="question"
          id="loading-menu"
          label="Loading"
        >
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            gap={1}
            flexDirection="column"
            justifyContent="center"
            color="white"
          >
            <Loader />
            <span>Loading, please wait...</span>
          </Box>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
WithFullIcons.storyName = "Full Icons";

export const NoIcons = (props: Partial<ResponsiveVerticalMenuProps>) => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenu {...props}>
        <ResponsiveVerticalMenuItem id="home" label="Home" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="accounting" label="Accounting" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="payroll" label="Payroll">
          <ResponsiveVerticalMenuItem id="payroll-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="payroll-sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          id="primary-menu"
          label={
            <Box display="flex" width="100%" alignItems="center" gap={1}>
              <span>Primary Menu Item</span>
              <Icon type="link" />
            </Box>
          }
        >
          <ResponsiveVerticalMenuItem id="sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem id="loading-menu" label="Loading">
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            gap={1}
            flexDirection="column"
            justifyContent="center"
            color="white"
          >
            <Loader />
            <span>Loading, please wait...</span>
          </Box>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
NoIcons.storyName = "No Icons";

export const MixedIcons = (props: Partial<ResponsiveVerticalMenuProps>) => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenu {...props}>
        <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem id="accounting" label="Accounting" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          id="payroll"
          label="Payroll"
          icon="business"
        >
          <ResponsiveVerticalMenuItem id="payroll-summary" label="Summary" />
          <ResponsiveVerticalMenuItem id="payroll-sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          id="primary-menu"
          label={
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              gap={1}
              color="white"
            >
              <span>Primary Menu Item</span>
              <Icon type="link" />
            </Box>
          }
        >
          <ResponsiveVerticalMenuItem id="sales" label="Sales" />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem id="loading-menu" label="Loading">
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            gap={1}
            flexDirection="column"
            justifyContent="center"
            color="white"
          >
            <Loader />
            <span>Loading, please wait...</span>
          </Box>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
MixedIcons.storyName = "Mixed Icons";

type MenuItem = {
  productName: string;
  menuItems?: MenuItem[];
};

const useGetData = () => {
  const [data] = useState<MenuItem[]>([
    {
      productName: "foo",
      menuItems: [{ productName: "bar" }, { productName: "baz" }],
    },
  ]);
  return data;
};

const usePostData = () => {
  const [postData, setPostData] = useState<MenuItem[]>([]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setPostData([
        {
          productName: "accounting",
          menuItems: [
            {
              productName: "payroll",
              menuItems: [{ productName: "payroll-summary" }],
            },
            { productName: "hr" },
            { productName: "clientmanage" },
          ],
        },
      ]);
    }, 5000);
    return () => {
      clearTimeout(handle);
    };
  }, []);
  return postData;
};

const TestMenu = ({ data }: { data: MenuItem[] }) => {
  const postData = usePostData();

  const products = postData.length === 0 ? data : postData;

  return (
    <ResponsiveVerticalMenu height="100%">
      <>
        <ResponsiveVerticalMenuItem
          label="Home"
          id="home"
          icon="home"
          href="#"
        />
        {products.map((p) => (
          <ResponsiveVerticalMenuItem
            key={p.productName}
            id={p.productName}
            label={p.productName}
          >
            {p?.menuItems?.map((s) => (
              <ResponsiveVerticalMenuItem
                key={s.productName}
                id={s.productName}
                label={s.productName}
              >
                {s?.menuItems?.map((t) => (
                  <ResponsiveVerticalMenuItem
                    key={t.productName}
                    id={t.productName}
                    label={t.productName}
                  />
                ))}
              </ResponsiveVerticalMenuItem>
            ))}
          </ResponsiveVerticalMenuItem>
        ))}
      </>
    </ResponsiveVerticalMenu>
  );
};

export const DelayedMenuItems = () => {
  const data = useGetData();
  return <TestMenu data={data} />;
};
DelayedMenuItems.storyName = "Delayed Menu Items";

const styles = `
  a:hover {
    color: darkgreen;
    text-decoration: underline;
  }
  `;

export const WithExternalLinkStyles = () => {
  return (
    <>
      <style>{styles}</style>
      <GlobalHeader>
        <ResponsiveVerticalMenu height="100%">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu"
            label="Primary Menu With Children"
          >
            <ResponsiveVerticalMenuItem
              id="secondary-menu"
              label="Secondary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="tertiary-menu"
                label="Tertiary Menu"
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuItem
              id="secondary-menu-no-children"
              label="Secondary Menu Item"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu-no-children"
            label="Primary Menu Item"
          />
        </ResponsiveVerticalMenu>
      </GlobalHeader>
    </>
  );
};

export const CustomLinkAction = (
  props: Partial<ResponsiveVerticalMenuProps>,
) => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu {...props}>
          <ResponsiveVerticalMenuItem
            icon="home"
            id="home"
            label="Home"
            onClick={() => setToggled(true)}
          />
          <ResponsiveVerticalMenuDivider />
          <ResponsiveVerticalMenuItem id="help" label="Help">
            <ResponsiveVerticalMenuItem
              id="help-centre"
              label={
                <Box display="flex" width="100%" alignItems="center" gap={1}>
                  <span>Help Centre</span>
                  <Icon type="link" />
                </Box>
              }
            />
            <ResponsiveVerticalMenuItem id="help-chat" label="Chat" />
            <ResponsiveVerticalMenuItem
              id="help-feedback"
              label="Give feedback"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Typography my={3}>
        HOME action fired: {toggled ? "Yes" : "No"}
      </Typography>
    </>
  );
};

export const FourLevels = (props: Partial<ResponsiveVerticalMenuProps>) => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenu {...props}>
        <ResponsiveVerticalMenuItem icon="home" id="home" label="Home" />
        <ResponsiveVerticalMenuDivider />
        <ResponsiveVerticalMenuItem
          customIcon={<CustomAccountingIcon />}
          id="level-1"
          label="Level 1"
        >
          <ResponsiveVerticalMenuItem
            id="level-2-item-1"
            label="Level 2 Item 1"
          />
          <ResponsiveVerticalMenuItem
            id="level-2-item-2"
            label="Level 2 Item 2"
          >
            <ResponsiveVerticalMenuItem
              id="level-3-item-1"
              label="Level 3 Item 1"
              href="#"
            >
              <ResponsiveVerticalMenuItem
                id="level-4-item-1"
                label="Level 4 Item 1"
                href="#"
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuItem
              id="level-3-item-2"
              label="Level 3 Item 2"
              href="#"
            />
            <ResponsiveVerticalMenuItem
              id="level-3-item-3"
              label="Level 3 Item 3"
              href="#"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            id="level-2-item-3"
            label="Level 2 Item 3"
          >
            <ResponsiveVerticalMenuItem
              id="level-3-item-4"
              label="Level 3 Item 4"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            id="level-2-item-4"
            label="Level 2 Item 4"
          />
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
FourLevels.storyName = "4th Level Menu Items";

export const WithDifferentDepthsAsLastItem = () => {
  return (
    <GlobalHeader>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="with-level-2" label="With Level 2">
          <ResponsiveVerticalMenuItem
            href="#"
            id="level-2-as-last-item"
            label="Level 2 As Last Item"
          />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem id="with-level-3" label="With Level 3">
          <ResponsiveVerticalMenuItem
            id="level-2-parent-1"
            label="Level 2 Parent"
          >
            <ResponsiveVerticalMenuItem
              href="#"
              id="level-3-as-last-item"
              label="Level 3 As Last Item"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem id="with-level-4" label="With Level 4">
          <ResponsiveVerticalMenuItem
            id="level-2-parent-2"
            label="Level 2 Parent"
          >
            <ResponsiveVerticalMenuItem
              id="level-3-parent"
              label="Level 3 Parent"
            >
              <ResponsiveVerticalMenuItem
                href="#"
                id="level-4-as-last-item"
                label="Level 4 As Last Item"
              />
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </GlobalHeader>
  );
};
