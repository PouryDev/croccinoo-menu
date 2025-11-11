import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-right text-sm text-cocoa-900 placeholder:text-cocoa-400 shadow-inner focus:border-cocoa-400 focus:ring-2 focus:ring-cocoa-200 focus:outline-none ' +
                className
            }
            ref={localRef}
        />
    );
});
