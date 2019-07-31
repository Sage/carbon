import { pointerSize, pointerSideMargin } from '../../../components/tooltip/tooltip-pointer.style';

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
      targetXCenter = targetWidth / 2,
      targetYCenter = targetHeight / 2;

  const tooltipDistances = {
    top: targetTop - tooltipHeight - pointerSize,
    bottom: targetBottom + pointerSize,
    left: targetLeft - tooltipWidth - pointerSize,
    right: targetRight + pointerSize
  };

  const vertical = {
    left: targetLeft - pointerSize,
    center: targetLeft + targetXCenter - (tooltipWidth / 2),
    right: (targetLeft - tooltipWidth) + targetXCenter + pointerSize + pointerSideMargin
  };

  const horizontal = {
    top: (targetTop + targetYCenter) - pointerSize - pointerSideMargin,
    center: targetTop + targetYCenter - (tooltipHeight / 2),
    bottom: (targetTop + targetYCenter - tooltipHeight) + pointerSize + pointerSideMargin
  };

  return { tooltipDistances, vertical, horizontal };
}
