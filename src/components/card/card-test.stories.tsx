import React from "react";
import { Meta } from "@storybook/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardRow, CardFooter, CardColumn, CardProps } from ".";

import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";

export default {
  title: "Card/Test",
  includeStories: ["DefaultStory", "CustomHeight"],
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "Test stories for the `Card` component.",
      },
    },
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
} as Meta<typeof Card>;

export const DefaultStory = (
  args: Omit<CardProps, "onClick" | "children" | "footer">,
) => {
  return (
    <Card
      {...args}
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Body text
          </Typography>
          <Heading title="More text" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
};
DefaultStory.storyName = "default";

export const CardComponent = (props: Partial<CardProps>) => {
  return (
    <Card {...props}>
      <CardRow>
        <CardColumn align="left">
          <Heading title="Stripe - [account name]" divider={false} />
          <Typography fontSize="16px" m={0}>
            user.name@sage.com
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
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

export const DraggableExample = () => {
  const columnNames = {
    PRODUCT_ONE: "Product One",
    PRODUCT_TWO: "Product Two",
  };

  const ITEM_TYPE = "Card";
  interface MovableItemProps {
    "data-element"?: string;
    name: string;
    changeColumn: (column: string) => void;
  }

  interface ColumnProps {
    "data-element"?: string;
    children?: React.ReactNode;
    title: string;
  }

  const MovableItem = ({
    "data-element": dataElement,
    name,
    changeColumn,
  }: MovableItemProps) => {
    const [{ isDragging }, drag] = useDrag({
      type: ITEM_TYPE,
      item: { name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult<{ column: string }>();
        if (!dropResult) return;
        changeColumn(dropResult.column);
      },
    });

    return (
      <Box
        ref={drag}
        opacity={isDragging ? 0.4 : 1}
        width="80%"
        height="100px"
        margin="16px auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card draggable data-element={dataElement}>
          <CardRow pt={0}>
            <CardColumn align="left">
              <Heading title={name} divider={false} />
              <Typography>user.name@sage.com</Typography>
            </CardColumn>
            <CardColumn align="right">
              <Icon type="image" />
            </CardColumn>
          </CardRow>
        </Card>
      </Box>
    );
  };

  const Column = ({
    "data-element": dataElement,
    children,
    title,
  }: ColumnProps) => {
    const [{ isOver }, drop] = useDrop({
      accept: ITEM_TYPE,
      drop: () => ({ column: title }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <Box
        ref={drop}
        backgroundColor={
          isOver
            ? "var(--colorsActionMajor500)"
            : "var(--colorsUtilityMajor075)"
        }
        data-element={dataElement}
        height="max-content"
        minHeight="100px"
        width="260px"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        m={2}
        py={2}
      >
        <Typography
          variant="b"
          color={isOver ? "var(--colorsGray000)" : undefined}
        >
          {title}
        </Typography>
        {children}
      </Box>
    );
  };

  const [cards, setCards] = React.useState([
    { id: 0, name: "Item 1", column: columnNames.PRODUCT_ONE },
    { id: 1, name: "Item 2", column: columnNames.PRODUCT_ONE },
    { id: 2, name: "Item 3", column: columnNames.PRODUCT_TWO },
    { id: 3, name: "Item 4", column: columnNames.PRODUCT_ONE },
  ]);

  const changeItemColumn = (id: number, column: string) => {
    setCards((prevState) =>
      prevState.map((card) => ({
        ...card,
        column: card.id === id ? column : card.column,
      })),
    );
  };

  const returnColumnItems = (column: string) =>
    cards
      .filter((card) => card.column === column)
      .map(({ id, name }) => (
        <MovableItem
          key={id}
          name={name}
          changeColumn={(newColumn) => changeItemColumn(id, newColumn)}
          data-element={`draggable-card-${id}`}
        />
      ));

  return (
    <Box width="700px" height="450px">
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <DndProvider backend={HTML5Backend}>
          <Column
            title={columnNames.PRODUCT_ONE}
            data-element="draggable-container-1"
          >
            {returnColumnItems(columnNames.PRODUCT_ONE)}
          </Column>
          <Column
            title={columnNames.PRODUCT_TWO}
            data-element="draggable-container-2"
          >
            {returnColumnItems(columnNames.PRODUCT_TWO)}
          </Column>
        </DndProvider>
      </Box>
    </Box>
  );
};

export const CardTextAlignment = ({ ...props }) => {
  return (
    <Card>
      <CardRow>
        <CardColumn {...props}>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
};

export const CustomHeight = () => {
  return (
    <>
      <Card
        height="500px"
        onClick={() => {}}
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        height="500px"
        href="#"
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </>
  );
};
