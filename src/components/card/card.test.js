/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
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

const DraggableExample = () => {
  const columnNames = {
    PRODUCT_ONE: "Product One",
    PRODUCT_TWO: "Product Two",
  };

  const ITEM_TYPE = "Card";

  const MovableItem = ({ "data-element": dataElement, name, changeColumn }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ITEM_TYPE,
      item: { name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult();
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

  const Column = ({ "data-element": dataElement, children, title }) => {
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

  const [cards, setCards] = useState([
    { id: 0, name: "Item 1", column: columnNames.PRODUCT_ONE },
    { id: 1, name: "Item 2", column: columnNames.PRODUCT_ONE },
    { id: 2, name: "Item 3", column: columnNames.PRODUCT_TWO },
    { id: 3, name: "Item 4", column: columnNames.PRODUCT_ONE },
  ]);

  const changeItemColumn = (id, column) => {
    setCards((prevState) =>
      prevState.map((c) => ({
        ...c,
        column: c.id === id ? column : c.column,
      }))
    );
  };

  const returnColumnItems = (column) =>
    cards
      .filter((c) => c.column === column)
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
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
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
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 48],
    ])(
      "should check %s spacing and padding for Card component ",
      (spacing, paddings) => {
        CypressMountWithProviders(<CardComponent spacing={spacing} />);
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "padding-left", paddings);
          useJQueryCssValueAndAssert($el, "padding-right", paddings);
        });
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
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it.each([
      [1, 2, 2, 2],
      [3, 1, 4, 0],
      [4, 2, 2, 2],
    ])(
      "drag %s Card item to the %s column",
      (draggableCardItem, columnName, lengthOfFirst, lengthOfSecond) => {
        CypressMountWithProviders(<DraggableExample />);

        draggableCard(draggableCardItem - 1).trigger("dragstart");
        draggableContainer(columnName).trigger("drop");
        draggableContainer(columnName).trigger("dragend");

        draggableContainer(columnName)
          .find(`[data-element="draggable-card-${draggableCardItem - 1}"]`)
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

    it("should allow custom boxShadow and hoverBoxShadow prop values", () => {
      CypressMountWithProviders(
        <CardComponent
          boxShadow="boxShadow400"
          hoverBoxShadow="boxShadow200"
          interactive
        />
      );
      card().should(
        "have.css",
        "box-shadow",
        "rgba(0, 20, 30, 0.04) 0px 10px 40px 0px, rgba(0, 20, 30, 0.1) 0px 50px 80px 0px"
      );
      card().realHover();
      card()
        .should("have.css", "cursor", "pointer")
        .and(
          "have.css",
          "box-shadow",
          "rgba(0, 20, 30, 0.2) 0px 10px 20px 0px, rgba(0, 20, 30, 0.1) 0px 20px 40px 0px"
        );
    });

    it.each(textAlignment)(
      "should check %s alignment for Card component",
      (align) => {
        CypressMountWithProviders(<CardTextAlignment align={align} />);
        columnCard().should("have.css", "text-align", align);
      }
    );

    it.each([375, 535, 777])(
      "should check %s height for Card component",
      (height) => {
        CypressMountWithProviders(<CardComponent height={`${height}px`} />);
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
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
