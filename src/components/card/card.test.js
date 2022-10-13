import * as React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useRef } from "react";
import { Card, CardRow, CardFooter, CardColumn } from ".";

import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import {
  card,
  draggableCard,
  draggableContainer,
  columnCard,
} from "../../../cypress/locators/card/index";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const textAlignment = ["center", "left", "right"];

const CardComponent = ({ ...props }) => {
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
          <Typography fontSize="16px" m={0} weight="bold">
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

const CardDraggable = ({ ...props }) => {
  const columnNames = {
    productOne: "Product One",
    productTwo: "Product Two",
  };
  const cards = [
    { id: 1, name: "Item 1", column: columnNames.productOne },
    { id: 2, name: "Item 2", column: columnNames.productOne },
    { id: 3, name: "Item 3", column: columnNames.productTwo },
    { id: 4, name: "Item 4", column: columnNames.productOne },
  ];
  const MovableItem = ({
    name,
    index,
    currentColumnName,
    setItems,
    dataElement,
  }) => {
    const changeItemColumn = (currentItem, columnName) => {
      setItems((prevState) => {
        return prevState.map((e) => {
          return {
            ...e,
            column: e.name === currentItem.name ? columnName : e.column,
          };
        });
      });
    };
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "Card",
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        item.index = hoverIndex;
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "Card",
      item: {
        index,
        name,
        currentColumnName,
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
          const { name: dropResultName } = dropResult;
          const { productOne, productTwo } = columnNames;
          switch (dropResultName) {
            case productTwo:
              changeItemColumn(item, productTwo);
              break;
            case productOne:
              changeItemColumn(item, productOne);
              break;
            default:
              break;
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));
    return (
      <Box
        ref={ref}
        style={{
          opacity,
          borderRadius: "5px",
          backgroundColor: "#FAFDFF",
          height: "100px",
          width: "80%",
          margin: "16px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Card id={name} {...props} draggable data-element={dataElement}>
          <CardRow>
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
  const Column = ({ children, title, dataElement }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "Card",
      drop: () => ({ name: title }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });
    const getBackgroundColor = () => {
      if (isOver && canDrop) {
        return "rgb(0, 129, 93)";
      }
      return "";
    };
    const getTextColor = () => {
      if (isOver && canDrop) {
        return "#FFFFFF";
      }
      return "";
    };
    return (
      <Box
        ref={drop}
        style={{
          backgroundColor: getBackgroundColor(),
          borderRadius: "10px",
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          border: "2px solid #7d7d7d",
          height: "max-content",
          minHeight: "100px",
          width: "260px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        m={2}
        data-element={dataElement}
      >
        <Typography variant="p" color={getTextColor()}>
          {title}
        </Typography>
        {children}
      </Box>
    );
  };
  const [items, setItems] = useState(cards);
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return copiedStateArray;
      });
    }
  };
  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
          dataElement={`draggable-card-${item.id}`}
        />
      ));
  };
  const { productOne, productTwo } = columnNames;
  return (
    <Box width="700px" height="450px">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <Column title={productOne} dataElement="draggable-container-1">
            {returnItemsForColumn(productOne)}
          </Column>
          <Column title={productTwo} dataElement="draggable-container-2">
            {returnItemsForColumn(productTwo)}
          </Column>
        </DndProvider>
      </div>
    </Box>
  );
};

const CardTextAlignment = ({ ...props }) => {
  return (
    <Card>
      <CardRow>
        <CardColumn {...props}>
          <Typography fontSize="16px" m={0} weight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
};

context("Tests for Card component", () => {
  describe("should check Card component properties", () => {
    it.each([
      ["small", 24],
      ["medium", 32],
      ["large", 48],
    ])(
      "should check %s spacing and padding for Card component ",
      (spacing, paddings) => {
        CypressMountWithProviders(<CardComponent spacing={spacing} />);
        card()
          .should("have.css", "padding-left", `${paddings}px`)
          .and("have.css", "padding-right", `${paddings}px`);
      }
    );

    it.each(testData)(
      "should check %s as children for Card component",
      (stringValue) => {
        CypressMountWithProviders(<Card>{stringValue}</Card>);
        card().should("have.text", stringValue);
      }
    );

    it.each([250, 500, 650, 300])(
      "should check %s width for Card component",
      (width) => {
        CypressMountWithProviders(<CardComponent cardWidth={`${width}px`} />);
        card().should("have.css", "width", `${width}px`);
      }
    );

    it.each([
      [1, 2, 2, 2],
      [3, 1, 4, 0],
      [4, 2, 2, 2],
    ])(
      "drag %s Card item to the %s column",
      (draggableCardItem, columnName, lengthOfFirst, lengthOfSecond) => {
        CypressMountWithProviders(<CardDraggable draggable />);

        draggableCard(draggableCardItem).trigger("dragstart");
        draggableContainer(columnName).trigger("drop");
        draggableContainer(columnName).trigger("dragend");

        draggableContainer(columnName)
          .find(`[data-element="draggable-card-${draggableCardItem}"]`)
          .should("exist")
          .and("be.visible");

        draggableContainer(1)
          .children()
          .should("have.length", lengthOfFirst + 1);

        draggableContainer(2)
          .children()
          .should("have.length", lengthOfSecond + 1);
      }
    );

    it("should check dataRole for Card component", () => {
      CypressMountWithProviders(<CardComponent data-role="cypress" />);
      card().should("have.attr", "data-role", "cypress");
    });

    it("should check interactive for Card component", () => {
      CypressMountWithProviders(<CardComponent interactive />);
      card().realHover();
      card()
        .should("have.css", "cursor", "pointer")
        .and(
          "have.css",
          "box-shadow",
          "rgba(0, 20, 30, 0.2) 0px 5px 5px 0px, rgba(0, 20, 30, 0.1) 0px 10px 10px 0px"
        );
    });

    it.each(textAlignment)(
      "should check %s alignment for Card component",
      (align) => {
        CypressMountWithProviders(<CardTextAlignment align={align} />);
        columnCard().should("have.css", "text-align", align);
      }
    );

    it("should call onClick callback when a click event is triggered", () => {
      const setClickCounter = cy.stub();

      CypressMountWithProviders(
        <CardComponent interactive action={setClickCounter} />
      );
      card()
        .click({ force: true })
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(setClickCounter).to.have.been.calledOnce;
        });
    });
  });
});
