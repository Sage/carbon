import {
  pointerSize,
  pointerSideMargin,
} from "../../../components/tooltip/tooltip-pointer.style";

export default function calculatePosition(tooltip, target) {
  const tooltipWidth = tooltip.offsetWidth,
    tooltipHeight = tooltip.offsetHeight,
    targetWidth = target.offsetWidth,
    targetHeight = target.offsetHeight,
    targetRect = target.getBoundingClientRect(),
    offsetY = window.pageYOffset,
    targetTop = targetRect.top + offsetY,
    targetBottom = targetRect.bottom + offsetY,
    targetLeft = targetRect.left,
    targetRight = targetRect.right,
    targetHalfWidth = targetWidth / 2,
    targetHalfHeight = targetHeight / 2;

  const tooltipDistances = {
    top: targetTop - tooltipHeight - pointerSize,
    bottom: targetBottom + pointerSize,
    left: targetLeft - tooltipWidth - pointerSize,
    right: targetRight + pointerSize,
  };

  const vertical = {
    left: targetLeft - pointerSize,
    center: targetLeft + targetHalfWidth - tooltipWidth / 2,
    right:
      targetLeft -
      tooltipWidth +
      targetHalfWidth +
      pointerSize +
      pointerSideMargin,
  };

  const horizontal = {
    top: targetTop + targetHalfHeight - pointerSize - pointerSideMargin,
    center: targetTop + targetHalfHeight - tooltipHeight / 2,
    bottom:
      targetTop +
      targetHalfHeight -
      tooltipHeight +
      pointerSize +
      pointerSideMargin,
  };

  return { tooltipDistances, vertical, horizontal };
}
