/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardRow, CardFooter, CardColumn, CardProps } from ".";
import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import Button from "../button";
import IconButton from "../icon-button";
import VerticalDivider from "../vertical-divider";

export const CardComponent = (props: Partial<CardProps>) => {
  return (
    <Card
      {...props}
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
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
      item: {
        name,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult<{
          column: string;
        }>();
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
      drop: () => ({
        column: title,
      }),
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
    {
      id: 0,
      name: "Item 1",
      column: columnNames.PRODUCT_ONE,
    },
    {
      id: 1,
      name: "Item 2",
      column: columnNames.PRODUCT_ONE,
    },
    {
      id: 2,
      name: "Item 3",
      column: columnNames.PRODUCT_TWO,
    },
    {
      id: 3,
      name: "Item 4",
      column: columnNames.PRODUCT_ONE,
    },
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

export const SmallSpacing = () => (
  <Card spacing="small">
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

export const LargeSpacing = () => (
  <Card spacing="large">
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

export const WithWidthProvided = () => (
  <Card
    width="500px"
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

export const WithCustomHeight = (props: Partial<CardProps>) => (
  <Card height="500px" {...props}>
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

export const WithCustomBoxShadow = () => (
  <Card boxShadow="boxShadow400" hoverBoxShadow="boxShadow200">
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

export const DifferentCardFooterPadding = () => {
  return (
    <Box>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={1} py={1}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={2} py={1}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={3} py={1}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={4} py={1}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={5} py={1}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={5} py={2}>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Box flexGrow={1}>
              <Button p={0} buttonType="tertiary" iconType="edit">
                Edit Button
              </Button>
            </Box>
            <Box>
              <Button buttonType="primary"> Button </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
    </Box>
  );
};

export const DifferentCardRowPadding = () => {
  return (
    <Card>
      <CardRow pt={2} pb={0}>
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
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 5 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
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

export const Interactive = () => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <Box>
      <Typography variant="b">
        Card has been clicked {clickCounter} times
      </Typography>
      <Card
        onClick={() => setClickCounter((prevCounter) => prevCounter + 1)}
        aria-label="Card with button element"
        footer={
          <CardFooter>
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a button as it has an onClick prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-label="Card with anchor element"
        footer={
          <CardFooter>
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a link as it has an href prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
};

export const MoreExamplesOfCardFooter = () => {
  return (
    <Box>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter p={1}>
          <Box
            alignItems="center"
            width="100%"
            display="flex"
            justifyContent="space-around"
          >
            <Box flexGrow={1}>
              <IconButton aria-label="Phone icon button" onClick={() => {}}>
                <Icon bgSize="medium" type="phone" />
              </IconButton>
              <IconButton aria-label="Phone icon button" onClick={() => {}}>
                <Icon bgSize="medium" type="phone" />
              </IconButton>
              <IconButton aria-label="Phone icon button" onClick={() => {}}>
                <Icon bgSize="medium" type="phone" />
              </IconButton>
              <IconButton aria-label="Phone icon button" onClick={() => {}}>
                <Icon bgSize="medium" type="phone" />
              </IconButton>
            </Box>
            <Box>
              <Button buttonType="tertiary"> Button </Button>
              <Button buttonType="primary" ml={2}>
                Button
              </Button>
            </Box>
          </Box>
        </CardFooter>
      </Card>
      <Card width="400px">
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter px={2} py={1}>
          <Box
            width="100%"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
            >
              Edit Button
            </Button>
            <VerticalDivider tint={80} py={0} px={2} h={30} />
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
              ml={2}
            >
              Edit Button
            </Button>
            <VerticalDivider tint={80} py={0} px={2} h={30} />
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
              ml={2}
            >
              Edit Button
            </Button>
          </Box>
        </CardFooter>
      </Card>
      <Card width="400px">
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter variant="transparent" px={2} py={1}>
          <Box
            width="100%"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
            >
              Edit Button
            </Button>
            <VerticalDivider tint={80} py={0} px={2} h={30} />
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
              ml={2}
            >
              Edit Button
            </Button>
            <VerticalDivider tint={80} py={0} px={2} h={30} />
            <Button
              p={0}
              iconPosition="after"
              iconType="edit"
              buttonType="tertiary"
              ml={2}
            >
              Edit Button
            </Button>
          </Box>
        </CardFooter>
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter p={2}>
          <Box display="flex" width="100%" justifyContent="center">
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </Box>
        </CardFooter>
      </Card>
    </Box>
  );
};

export const WithDraggable = () => {
  const columnNames = {
    PRODUCT_ONE: "Product One",
    PRODUCT_TWO: "Product Two",
  } as const;

  const ITEM_TYPE = "Card";

  interface CardSpec {
    id: number;
    name: string;
    column: string;
  }

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

  const App = () => {
    const [cards, setCards] = useState<CardSpec[]>([
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
  return <App />;
};

export const WithStringAsChild = () => {
  return <Card>String passed as child</Card>;
};
