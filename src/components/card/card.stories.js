import React from "react";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import Card from "./card.component";
import CardRow from "./card-row";
import CardColumn from "./card-column";
import CardFooter from "./card-footer";
import Link from "../link";
import Heading from "../heading/heading";
import Typography from "../typography/typography.component";
import Icon from "../icon";

export default {
  title: "Design System/Card/Test",
  component: Card,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  return (
    <Card interactive action={action("action prop triggered")}>
      <CardRow>
        <CardColumn align="left">
          <Heading title="Stripe - [account name]" divider={false} />
          <Typography variant="h5">user.name@sage.com</Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography variant="h5" weight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography fontSize="12px">LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardFooter>
        <CardColumn>
          <Link icon="link" href="https://carbon.sage.com/">
            View Stripe Dashboard
          </Link>
        </CardColumn>
      </CardFooter>
    </Card>
  );
};
