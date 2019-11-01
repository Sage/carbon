# Related Components
Although the Table component has drag and drop enabled already, any combination of components can be made draggable through the use of the WithDrag and WithDrop components:

```<DraggableContext onDrag={ onItemMoved }>
  <ol>
    {items.map((item, index) => {
      return (
        <WithDrop index={ index }>
          <li>
            <WithDrag><span>{ item.content }</span></WithDrag>
          </li>
        </WithDrop>
      );
    })}
  </ol>
</DraggableContext>```
