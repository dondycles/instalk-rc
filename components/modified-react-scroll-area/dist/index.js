var $4huGU$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $4huGU$react = require("react");
var $4huGU$radixuireactprimitive = require("@radix-ui/react-primitive");
var $4huGU$radixuireactpresence = require("@radix-ui/react-presence");
var $4huGU$radixuireactcontext = require("@radix-ui/react-context");
var $4huGU$radixuireactcomposerefs = require("@radix-ui/react-compose-refs");
var $4huGU$radixuireactusecallbackref = require("@radix-ui/react-use-callback-ref");
var $4huGU$radixuireactdirection = require("@radix-ui/react-direction");
var $4huGU$radixuireactuselayouteffect = require("@radix-ui/react-use-layout-effect");
var $4huGU$radixuinumber = require("@radix-ui/number");
var $4huGU$radixuiprimitive = require("@radix-ui/primitive");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "createScrollAreaScope", () => $f8fcbf76d19b7361$export$488468afe3a6f2b1);
$parcel$export(module.exports, "ScrollArea", () => $f8fcbf76d19b7361$export$ccf8d8d7bbf3c2cc);
$parcel$export(module.exports, "ScrollAreaViewport", () => $f8fcbf76d19b7361$export$a21cbf9f11fca853);
$parcel$export(module.exports, "ScrollAreaScrollbar", () => $f8fcbf76d19b7361$export$2fabd85d0eba3c57);
$parcel$export(module.exports, "ScrollAreaThumb", () => $f8fcbf76d19b7361$export$9fba1154677d7cd2);
$parcel$export(module.exports, "ScrollAreaCorner", () => $f8fcbf76d19b7361$export$56969d565df7cc4b);
$parcel$export(module.exports, "Root", () => $f8fcbf76d19b7361$export$be92b6f5f03c0fe9);
$parcel$export(module.exports, "Viewport", () => $f8fcbf76d19b7361$export$d5c6c08dc2d3ca7);
$parcel$export(module.exports, "Scrollbar", () => $f8fcbf76d19b7361$export$9a4e88b92edfce6b);
$parcel$export(module.exports, "Thumb", () => $f8fcbf76d19b7361$export$6521433ed15a34db);
$parcel$export(module.exports, "Corner", () => $f8fcbf76d19b7361$export$ac61190d9fc311a9);












function $39a0f473320532da$export$3e6543de14f8614f(initialState, machine) {
    return $4huGU$react.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$SCROLL_AREA_NAME = 'ScrollArea';
const [$f8fcbf76d19b7361$var$createScrollAreaContext, $f8fcbf76d19b7361$export$488468afe3a6f2b1] = $4huGU$radixuireactcontext.createContextScope($f8fcbf76d19b7361$var$SCROLL_AREA_NAME);
const [$f8fcbf76d19b7361$var$ScrollAreaProvider, $f8fcbf76d19b7361$var$useScrollAreaContext] = $f8fcbf76d19b7361$var$createScrollAreaContext($f8fcbf76d19b7361$var$SCROLL_AREA_NAME);
const $f8fcbf76d19b7361$export$ccf8d8d7bbf3c2cc = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , type: type = 'hover' , dir: dir , scrollHideDelay: scrollHideDelay = 600 , ...scrollAreaProps } = props;
    const [scrollArea, setScrollArea] = $4huGU$react.useState(null);
    const [viewport, setViewport] = $4huGU$react.useState(null);
    const [content, setContent] = $4huGU$react.useState(null);
    const [scrollbarX, setScrollbarX] = $4huGU$react.useState(null);
    const [scrollbarY, setScrollbarY] = $4huGU$react.useState(null);
    const [cornerWidth, setCornerWidth] = $4huGU$react.useState(0);
    const [cornerHeight, setCornerHeight] = $4huGU$react.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = $4huGU$react.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = $4huGU$react.useState(false);
    const composedRefs = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, (node)=>setScrollArea(node)
    );
    const direction = $4huGU$radixuireactdirection.useDirection(dir);
    return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaProvider, {
        scope: __scopeScrollArea,
        type: type,
        dir: direction,
        scrollHideDelay: scrollHideDelay,
        scrollArea: scrollArea,
        viewport: viewport,
        onViewportChange: setViewport,
        content: content,
        onContentChange: setContent,
        scrollbarX: scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled: scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY: scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled: scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight
    }, /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        dir: direction
    }, scrollAreaProps, {
        ref: composedRefs,
        style: {
            position: 'relative',
            // Pass corner sizes as CSS vars to reduce re-renders of context consumers
            ['--radix-scroll-area-corner-width']: cornerWidth + 'px',
            ['--radix-scroll-area-corner-height']: cornerHeight + 'px',
            ...props.style
        }
    })));
});
/*#__PURE__*/ Object.assign($f8fcbf76d19b7361$export$ccf8d8d7bbf3c2cc, {
    displayName: $f8fcbf76d19b7361$var$SCROLL_AREA_NAME
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaViewport
 * -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$VIEWPORT_NAME = 'ScrollAreaViewport';
const $f8fcbf76d19b7361$export$a21cbf9f11fca853 = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , children: children , ...viewportProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$VIEWPORT_NAME, __scopeScrollArea);
    const ref = $4huGU$react.useRef(null);
    const composedRefs = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$react.Fragment, null, /*#__PURE__*/ $4huGU$react.createElement("style", {
        dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
        }
    }), /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-radix-scroll-area-viewport": ""
    }, viewportProps, {
        ref: composedRefs,
        style: {
            /**
       * We don't support `visible` because the intention is to have at least one scrollbar
       * if this component is used and `visible` will behave like `auto` in that case
       * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
       *
       * We don't handle `auto` because the intention is for the native implementation
       * to be hidden if using this component. We just want to ensure the node is scrollable
       * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
       * the browser from having to work out whether to render native scrollbars or not,
       * we tell it to with the intention of hiding them in CSS.
       */ overflowX: context.scrollbarXEnabled ? 'scroll' : 'hidden',
            overflowY: context.scrollbarYEnabled ? 'scroll' : 'hidden',
            ...props.style
        }
    }), /*#__PURE__*/ $4huGU$react.createElement("div", {
        ref: context.onContentChange,
        style: {
            minWidth: '100%',
            display: 'table'
        }
    }, children)));
});
/*#__PURE__*/ Object.assign($f8fcbf76d19b7361$export$a21cbf9f11fca853, {
    displayName: $f8fcbf76d19b7361$var$VIEWPORT_NAME
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollbar
 * -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$SCROLLBAR_NAME = 'ScrollAreaScrollbar';
const $f8fcbf76d19b7361$export$2fabd85d0eba3c57 = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange: onScrollbarXEnabledChange , onScrollbarYEnabledChange: onScrollbarYEnabledChange  } = context;
    const isHorizontal = props.orientation === 'horizontal';
    $4huGU$react.useEffect(()=>{
        isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
        return ()=>{
            isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
        };
    }, [
        isHorizontal,
        onScrollbarXEnabledChange,
        onScrollbarYEnabledChange
    ]);
    return context.type === 'hover' ? /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarHover, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'scroll' ? /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarScroll, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'auto' ? /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarAuto, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'always' ? /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarVisible, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, scrollbarProps, {
        ref: forwardedRef
    })) : null;
});
/*#__PURE__*/ Object.assign($f8fcbf76d19b7361$export$2fabd85d0eba3c57, {
    displayName: $f8fcbf76d19b7361$var$SCROLLBAR_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$ScrollAreaScrollbarHover = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [visible, setVisible] = $4huGU$react.useState(false);
    $4huGU$react.useEffect(()=>{
        const scrollArea = context.scrollArea;
        let hideTimer = 0;
        if (scrollArea) {
            const handlePointerEnter = ()=>{
                window.clearTimeout(hideTimer);
                setVisible(true);
            };
            const handlePointerLeave = ()=>{
                hideTimer = window.setTimeout(()=>setVisible(false)
                , context.scrollHideDelay);
            };
            scrollArea.addEventListener('pointerenter', handlePointerEnter);
            scrollArea.addEventListener('pointerleave', handlePointerLeave);
            return ()=>{
                window.clearTimeout(hideTimer);
                scrollArea.removeEventListener('pointerenter', handlePointerEnter);
                scrollArea.removeEventListener('pointerleave', handlePointerLeave);
            };
        }
    }, [
        context.scrollArea,
        context.scrollHideDelay
    ]);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactpresence.Presence, {
        present: forceMount || visible
    }, /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarAuto, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-state": visible ? 'visible' : 'hidden'
    }, scrollbarProps, {
        ref: forwardedRef
    })));
});
const $f8fcbf76d19b7361$var$ScrollAreaScrollbarScroll = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const isHorizontal = props.orientation === 'horizontal';
    const debounceScrollEnd = $f8fcbf76d19b7361$var$useDebounceCallback(()=>send('SCROLL_END')
    , 100);
    const [state, send] = $39a0f473320532da$export$3e6543de14f8614f('hidden', {
        hidden: {
            SCROLL: 'scrolling'
        },
        scrolling: {
            SCROLL_END: 'idle',
            POINTER_ENTER: 'interacting'
        },
        interacting: {
            SCROLL: 'interacting',
            POINTER_LEAVE: 'idle'
        },
        idle: {
            HIDE: 'hidden',
            SCROLL: 'scrolling',
            POINTER_ENTER: 'interacting'
        }
    });
    $4huGU$react.useEffect(()=>{
        if (state === 'idle') {
            const hideTimer = window.setTimeout(()=>send('HIDE')
            , context.scrollHideDelay);
            return ()=>window.clearTimeout(hideTimer)
            ;
        }
    }, [
        state,
        context.scrollHideDelay,
        send
    ]);
    $4huGU$react.useEffect(()=>{
        const viewport = context.viewport;
        const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop';
        if (viewport) {
            let prevScrollPos = viewport[scrollDirection];
            const handleScroll = ()=>{
                const scrollPos = viewport[scrollDirection];
                const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
                if (hasScrollInDirectionChanged) {
                    send('SCROLL');
                    debounceScrollEnd();
                }
                prevScrollPos = scrollPos;
            };
            viewport.addEventListener('scroll', handleScroll);
            return ()=>viewport.removeEventListener('scroll', handleScroll)
            ;
        }
    }, [
        context.viewport,
        isHorizontal,
        send,
        debounceScrollEnd
    ]);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactpresence.Presence, {
        present: forceMount || state !== 'hidden'
    }, /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarVisible, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-state": state === 'hidden' ? 'hidden' : 'visible'
    }, scrollbarProps, {
        ref: forwardedRef,
        onPointerEnter: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerEnter, ()=>send('POINTER_ENTER')
        ),
        onPointerLeave: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerLeave, ()=>send('POINTER_LEAVE')
        )
    })));
});
const $f8fcbf76d19b7361$var$ScrollAreaScrollbarAuto = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const [visible, setVisible] = $4huGU$react.useState(false);
    const isHorizontal = props.orientation === 'horizontal';
    const handleResize = $f8fcbf76d19b7361$var$useDebounceCallback(()=>{
        if (context.viewport) {
            const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
            const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
            setVisible(isHorizontal ? isOverflowX : isOverflowY);
        }
    }, 10);
    $f8fcbf76d19b7361$var$useResizeObserver(context.viewport, handleResize);
    $f8fcbf76d19b7361$var$useResizeObserver(context.content, handleResize);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactpresence.Presence, {
        present: forceMount || visible
    }, /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarVisible, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-state": visible ? 'visible' : 'hidden'
    }, scrollbarProps, {
        ref: forwardedRef
    })));
});
/* -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$ScrollAreaScrollbarVisible = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { orientation: orientation = 'vertical' , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const thumbRef = $4huGU$react.useRef(null);
    const pointerOffsetRef = $4huGU$react.useRef(0);
    const [sizes, setSizes] = $4huGU$react.useState({
        content: 0,
        viewport: 0,
        scrollbar: {
            size: 0,
            paddingStart: 0,
            paddingEnd: 0
        }
    });
    const thumbRatio = $f8fcbf76d19b7361$var$getThumbRatio(sizes.viewport, sizes.content);
    const commonProps = {
        ...scrollbarProps,
        sizes: sizes,
        onSizesChange: setSizes,
        hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
        onThumbChange: (thumb)=>thumbRef.current = thumb
        ,
        onThumbPointerUp: ()=>pointerOffsetRef.current = 0
        ,
        onThumbPointerDown: (pointerPos)=>pointerOffsetRef.current = pointerPos
    };
    function getScrollPosition(pointerPos, dir) {
        return $f8fcbf76d19b7361$var$getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
    }
    if (orientation === 'horizontal') return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarX, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef,
        onThumbPositionChange: ()=>{
            if (context.viewport && thumbRef.current) {
                const scrollPos = context.viewport.scrollLeft;
                const offset = $f8fcbf76d19b7361$var$getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
                thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
            }
        },
        onWheelScroll: (scrollPos)=>{
            if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos)=>{
            if (context.viewport) context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
        }
    }));
    if (orientation === 'vertical') return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarY, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef,
        onThumbPositionChange: ()=>{
            if (context.viewport && thumbRef.current) {
                const scrollPos = context.viewport.scrollTop;
                const offset = $f8fcbf76d19b7361$var$getThumbOffsetFromScroll(scrollPos, sizes);
                thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        },
        onWheelScroll: (scrollPos)=>{
            if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos)=>{
            if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
    }));
    return null;
});
/* -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$ScrollAreaScrollbarX = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { sizes: sizes , onSizesChange: onSizesChange , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = $4huGU$react.useState();
    const ref = $4huGU$react.useRef(null);
    const composeRefs = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
    $4huGU$react.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarImpl, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-orientation": "horizontal"
    }, scrollbarProps, {
        ref: composeRefs,
        sizes: sizes,
        style: {
            bottom: 0,
            left: context.dir === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
            right: context.dir === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
            ['--radix-scroll-area-thumb-width']: $f8fcbf76d19b7361$var$getThumbSize(sizes) + 'px',
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.x)
        ,
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.x)
        ,
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollLeft + event.deltaX;
                props.onWheelScroll(scrollPos); // prevent window scroll when wheeling on scrollbar
                if ($f8fcbf76d19b7361$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) onSizesChange({
                content: context.viewport.scrollWidth,
                viewport: context.viewport.offsetWidth,
                scrollbar: {
                    size: ref.current.clientWidth,
                    paddingStart: $f8fcbf76d19b7361$var$toInt(computedStyle.paddingLeft),
                    paddingEnd: $f8fcbf76d19b7361$var$toInt(computedStyle.paddingRight)
                }
            });
        }
    }));
});
const $f8fcbf76d19b7361$var$ScrollAreaScrollbarY = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { sizes: sizes , onSizesChange: onSizesChange , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = $4huGU$react.useState();
    const ref = $4huGU$react.useRef(null);
    const composeRefs = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
    $4huGU$react.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaScrollbarImpl, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-orientation": "vertical"
    }, scrollbarProps, {
        ref: composeRefs,
        sizes: sizes,
        style: {
            top: 0,
            right: context.dir === 'ltr' ? 0 : undefined,
            left: context.dir === 'rtl' ? 0 : undefined,
            bottom: 'var(--radix-scroll-area-corner-height)',
            ['--radix-scroll-area-thumb-height']: $f8fcbf76d19b7361$var$getThumbSize(sizes) + 'px',
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.y)
        ,
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.y)
        ,
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollTop + event.deltaY;
                props.onWheelScroll(scrollPos); // prevent window scroll when wheeling on scrollbar
                if ($f8fcbf76d19b7361$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) onSizesChange({
                content: context.viewport.scrollHeight,
                viewport: context.viewport.offsetHeight,
                scrollbar: {
                    size: ref.current.clientHeight,
                    paddingStart: $f8fcbf76d19b7361$var$toInt(computedStyle.paddingTop),
                    paddingEnd: $f8fcbf76d19b7361$var$toInt(computedStyle.paddingBottom)
                }
            });
        }
    }));
});
/* -----------------------------------------------------------------------------------------------*/ const [$f8fcbf76d19b7361$var$ScrollbarProvider, $f8fcbf76d19b7361$var$useScrollbarContext] = $f8fcbf76d19b7361$var$createScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME);
const $f8fcbf76d19b7361$var$ScrollAreaScrollbarImpl = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , sizes: sizes , hasThumb: hasThumb , onThumbChange: onThumbChange , onThumbPointerUp: onThumbPointerUp , onThumbPointerDown: onThumbPointerDown , onThumbPositionChange: onThumbPositionChange , onDragScroll: onDragScroll , onWheelScroll: onWheelScroll , onResize: onResize , ...scrollbarProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$SCROLLBAR_NAME, __scopeScrollArea);
    const [scrollbar, setScrollbar] = $4huGU$react.useState(null);
    const composeRefs = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, (node)=>setScrollbar(node)
    );
    const rectRef = $4huGU$react.useRef(null);
    const prevWebkitUserSelectRef = $4huGU$react.useRef('');
    const viewport = context.viewport;
    const maxScrollPos = sizes.content - sizes.viewport;
    const handleWheelScroll = $4huGU$radixuireactusecallbackref.useCallbackRef(onWheelScroll);
    const handleThumbPositionChange = $4huGU$radixuireactusecallbackref.useCallbackRef(onThumbPositionChange);
    const handleResize = $f8fcbf76d19b7361$var$useDebounceCallback(onResize, 10);
    function handleDragScroll(event) {
        if (rectRef.current) {
            const x = event.clientX - rectRef.current.left;
            const y = event.clientY - rectRef.current.top;
            onDragScroll({
                x: x,
                y: y
            });
        }
    }
    /**
   * We bind wheel event imperatively so we can switch off passive
   * mode for document wheel event to allow it to be prevented
   */ $4huGU$react.useEffect(()=>{
        const handleWheel = (event)=>{
            const element = event.target;
            const isScrollbarWheel = scrollbar === null || scrollbar === void 0 ? void 0 : scrollbar.contains(element);
            if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
        };
        document.addEventListener('wheel', handleWheel, {
            passive: false
        });
        return ()=>document.removeEventListener('wheel', handleWheel, {
                passive: false
            })
        ;
    }, [
        viewport,
        scrollbar,
        maxScrollPos,
        handleWheelScroll
    ]);
    /**
   * Update thumb position on sizes change
   */ $4huGU$react.useEffect(handleThumbPositionChange, [
        sizes,
        handleThumbPositionChange
    ]);
    $f8fcbf76d19b7361$var$useResizeObserver(scrollbar, handleResize);
    $f8fcbf76d19b7361$var$useResizeObserver(context.content, handleResize);
    return /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollbarProvider, {
        scope: __scopeScrollArea,
        scrollbar: scrollbar,
        hasThumb: hasThumb,
        onThumbChange: $4huGU$radixuireactusecallbackref.useCallbackRef(onThumbChange),
        onThumbPointerUp: $4huGU$radixuireactusecallbackref.useCallbackRef(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: $4huGU$radixuireactusecallbackref.useCallbackRef(onThumbPointerDown)
    }, /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, scrollbarProps, {
        ref: composeRefs,
        style: {
            position: 'absolute',
            ...scrollbarProps.style
        },
        onPointerDown: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerDown, (event)=>{
            const mainPointer = 0;
            if (event.button === mainPointer) {
                const element = event.target;
                element.setPointerCapture(event.pointerId);
                rectRef.current = scrollbar.getBoundingClientRect(); // pointer capture doesn't prevent text selection in Safari
                // so we remove text selection manually when scrolling
                prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
                document.body.style.webkitUserSelect = 'none';
                if (context.viewport) context.viewport.style.scrollBehavior = 'auto';
                handleDragScroll(event);
            }
        }),
        onPointerMove: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerMove, handleDragScroll),
        onPointerUp: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerUp, (event)=>{
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = '';
            rectRef.current = null;
        })
    })));
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb
 * -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$THUMB_NAME = 'ScrollAreaThumb';
const $f8fcbf76d19b7361$export$9fba1154677d7cd2 = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...thumbProps } = props;
    const scrollbarContext = $f8fcbf76d19b7361$var$useScrollbarContext($f8fcbf76d19b7361$var$THUMB_NAME, props.__scopeScrollArea);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactpresence.Presence, {
        present: forceMount || scrollbarContext.hasThumb
    }, /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaThumbImpl, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        ref: forwardedRef
    }, thumbProps)));
});
const $f8fcbf76d19b7361$var$ScrollAreaThumbImpl = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , style: style , ...thumbProps } = props;
    const scrollAreaContext = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = $f8fcbf76d19b7361$var$useScrollbarContext($f8fcbf76d19b7361$var$THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange: onThumbPositionChange  } = scrollbarContext;
    const composedRef = $4huGU$radixuireactcomposerefs.useComposedRefs(forwardedRef, (node)=>scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = $4huGU$react.useRef();
    const debounceScrollEnd = $f8fcbf76d19b7361$var$useDebounceCallback(()=>{
        if (removeUnlinkedScrollListenerRef.current) {
            removeUnlinkedScrollListenerRef.current();
            removeUnlinkedScrollListenerRef.current = undefined;
        }
    }, 100);
    $4huGU$react.useEffect(()=>{
        const viewport = scrollAreaContext.viewport;
        if (viewport) {
            /**
       * We only bind to native scroll event so we know when scroll starts and ends.
       * When scroll starts we start a requestAnimationFrame loop that checks for
       * changes to scroll position. That rAF loop triggers our thumb position change
       * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
       * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
       */ const handleScroll = ()=>{
                debounceScrollEnd();
                if (!removeUnlinkedScrollListenerRef.current) {
                    const listener = $f8fcbf76d19b7361$var$addUnlinkedScrollListener(viewport, onThumbPositionChange);
                    removeUnlinkedScrollListenerRef.current = listener;
                    onThumbPositionChange();
                }
            };
            onThumbPositionChange();
            viewport.addEventListener('scroll', handleScroll);
            return ()=>viewport.removeEventListener('scroll', handleScroll)
            ;
        }
    }, [
        scrollAreaContext.viewport,
        debounceScrollEnd,
        onThumbPositionChange
    ]);
    return /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({
        "data-state": scrollbarContext.hasThumb ? 'visible' : 'hidden'
    }, thumbProps, {
        ref: composedRef,
        style: {
            width: 'var(--radix-scroll-area-thumb-width)',
            height: 'var(--radix-scroll-area-thumb-height)',
            ...style
        },
        onPointerDownCapture: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerDownCapture, (event)=>{
            const thumb = event.target;
            const thumbRect = thumb.getBoundingClientRect();
            const x = event.clientX - thumbRect.left;
            const y = event.clientY - thumbRect.top;
            scrollbarContext.onThumbPointerDown({
                x: x,
                y: y
            });
        }),
        onPointerUp: $4huGU$radixuiprimitive.composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    }));
});
/*#__PURE__*/ Object.assign($f8fcbf76d19b7361$export$9fba1154677d7cd2, {
    displayName: $f8fcbf76d19b7361$var$THUMB_NAME
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCorner
 * -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$CORNER_NAME = 'ScrollAreaCorner';
const $f8fcbf76d19b7361$export$56969d565df7cc4b = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== 'scroll' && hasBothScrollbarsVisible;
    return hasCorner ? /*#__PURE__*/ $4huGU$react.createElement($f8fcbf76d19b7361$var$ScrollAreaCornerImpl, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, props, {
        ref: forwardedRef
    })) : null;
});
/*#__PURE__*/ Object.assign($f8fcbf76d19b7361$export$56969d565df7cc4b, {
    displayName: $f8fcbf76d19b7361$var$CORNER_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$var$ScrollAreaCornerImpl = /*#__PURE__*/ $4huGU$react.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , ...cornerProps } = props;
    const context = $f8fcbf76d19b7361$var$useScrollAreaContext($f8fcbf76d19b7361$var$CORNER_NAME, __scopeScrollArea);
    const [width1, setWidth] = $4huGU$react.useState(0);
    const [height1, setHeight] = $4huGU$react.useState(0);
    const hasSize = Boolean(width1 && height1);
    $f8fcbf76d19b7361$var$useResizeObserver(context.scrollbarX, ()=>{
        var _context$scrollbarX;
        const height = ((_context$scrollbarX = context.scrollbarX) === null || _context$scrollbarX === void 0 ? void 0 : _context$scrollbarX.offsetHeight) || 0;
        context.onCornerHeightChange(height);
        setHeight(height);
    });
    $f8fcbf76d19b7361$var$useResizeObserver(context.scrollbarY, ()=>{
        var _context$scrollbarY;
        const width = ((_context$scrollbarY = context.scrollbarY) === null || _context$scrollbarY === void 0 ? void 0 : _context$scrollbarY.offsetWidth) || 0;
        context.onCornerWidthChange(width);
        setWidth(width);
    });
    return hasSize ? /*#__PURE__*/ $4huGU$react.createElement($4huGU$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($4huGU$babelruntimehelpersextends))({}, cornerProps, {
        ref: forwardedRef,
        style: {
            width: width1,
            height: height1,
            position: 'absolute',
            right: context.dir === 'ltr' ? 0 : undefined,
            left: context.dir === 'rtl' ? 0 : undefined,
            bottom: 0,
            ...props.style
        }
    })) : null;
});
/* -----------------------------------------------------------------------------------------------*/ function $f8fcbf76d19b7361$var$toInt(value) {
    return value ? parseInt(value, 10) : 0;
}
function $f8fcbf76d19b7361$var$getThumbRatio(viewportSize, contentSize) {
    const ratio = viewportSize / contentSize;
    return isNaN(ratio) ? 0 : ratio;
}
function $f8fcbf76d19b7361$var$getThumbSize(sizes) {
    const ratio = $f8fcbf76d19b7361$var$getThumbRatio(sizes.viewport, sizes.content);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio; // minimum of 18 matches macOS minimum
    return Math.max(thumbSize, 18);
}
function $f8fcbf76d19b7361$var$getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = 'ltr') {
    const thumbSizePx = $f8fcbf76d19b7361$var$getThumbSize(sizes);
    const thumbCenter = thumbSizePx / 2;
    const offset = pointerOffset || thumbCenter;
    const thumbOffsetFromEnd = thumbSizePx - offset;
    const minPointerPos = sizes.scrollbar.paddingStart + offset;
    const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
    const maxScrollPos = sizes.content - sizes.viewport;
    const scrollRange = dir === 'ltr' ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const interpolate = $f8fcbf76d19b7361$var$linearScale([
        minPointerPos,
        maxPointerPos
    ], scrollRange);
    return interpolate(pointerPos);
}
function $f8fcbf76d19b7361$var$getThumbOffsetFromScroll(scrollPos, sizes, dir = 'ltr') {
    const thumbSizePx = $f8fcbf76d19b7361$var$getThumbSize(sizes);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const scrollbar = sizes.scrollbar.size - scrollbarPadding;
    const maxScrollPos = sizes.content - sizes.viewport;
    const maxThumbPos = scrollbar - thumbSizePx;
    const scrollClampRange = dir === 'ltr' ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const scrollWithoutMomentum = $4huGU$radixuinumber.clamp(scrollPos, scrollClampRange);
    const interpolate = $f8fcbf76d19b7361$var$linearScale([
        0,
        maxScrollPos
    ], [
        0,
        maxThumbPos
    ]);
    return interpolate(scrollWithoutMomentum);
} // https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
function $f8fcbf76d19b7361$var$linearScale(input, output) {
    return (value)=>{
        if (input[0] === input[1] || output[0] === output[1]) return output[0];
        const ratio = (output[1] - output[0]) / (input[1] - input[0]);
        return output[0] + ratio * (value - input[0]);
    };
}
function $f8fcbf76d19b7361$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
    return scrollPos > 0 && scrollPos < maxScrollPos;
} // Custom scroll handler to avoid scroll-linked effects
// https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
const $f8fcbf76d19b7361$var$addUnlinkedScrollListener = (node, handler = ()=>{})=>{
    let prevPosition = {
        left: node.scrollLeft,
        top: node.scrollTop
    };
    let rAF = 0;
    (function loop() {
        const position = {
            left: node.scrollLeft,
            top: node.scrollTop
        };
        const isHorizontalScroll = prevPosition.left !== position.left;
        const isVerticalScroll = prevPosition.top !== position.top;
        if (isHorizontalScroll || isVerticalScroll) handler();
        prevPosition = position;
        rAF = window.requestAnimationFrame(loop);
    })();
    return ()=>window.cancelAnimationFrame(rAF)
    ;
};
function $f8fcbf76d19b7361$var$useDebounceCallback(callback, delay) {
    const handleCallback = $4huGU$radixuireactusecallbackref.useCallbackRef(callback);
    const debounceTimerRef = $4huGU$react.useRef(0);
    $4huGU$react.useEffect(()=>()=>window.clearTimeout(debounceTimerRef.current)
    , []);
    return $4huGU$react.useCallback(()=>{
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = window.setTimeout(handleCallback, delay);
    }, [
        handleCallback,
        delay
    ]);
}
function $f8fcbf76d19b7361$var$useResizeObserver(element, onResize) {
    const handleResize = $4huGU$radixuireactusecallbackref.useCallbackRef(onResize);
    $4huGU$radixuireactuselayouteffect.useLayoutEffect(()=>{
        let rAF = 0;
        if (element) {
            /**
       * Resize Observer will throw an often benign error that says `ResizeObserver loop
       * completed with undelivered notifications`. This means that ResizeObserver was not
       * able to deliver all observations within a single animation frame, so we use
       * `requestAnimationFrame` to ensure we don't deliver unnecessary observations.
       * Further reading: https://github.com/WICG/resize-observer/issues/38
       */ const resizeObserver = new ResizeObserver(()=>{
                cancelAnimationFrame(rAF);
                rAF = window.requestAnimationFrame(handleResize);
            });
            resizeObserver.observe(element);
            return ()=>{
                window.cancelAnimationFrame(rAF);
                resizeObserver.unobserve(element);
            };
        }
    }, [
        element,
        handleResize
    ]);
}
/* -----------------------------------------------------------------------------------------------*/ const $f8fcbf76d19b7361$export$be92b6f5f03c0fe9 = $f8fcbf76d19b7361$export$ccf8d8d7bbf3c2cc;
const $f8fcbf76d19b7361$export$d5c6c08dc2d3ca7 = $f8fcbf76d19b7361$export$a21cbf9f11fca853;
const $f8fcbf76d19b7361$export$9a4e88b92edfce6b = $f8fcbf76d19b7361$export$2fabd85d0eba3c57;
const $f8fcbf76d19b7361$export$6521433ed15a34db = $f8fcbf76d19b7361$export$9fba1154677d7cd2;
const $f8fcbf76d19b7361$export$ac61190d9fc311a9 = $f8fcbf76d19b7361$export$56969d565df7cc4b;




//# sourceMappingURL=index.js.map
