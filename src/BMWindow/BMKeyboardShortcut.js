import { NO } from "../Core/BMCoreUI";

// @ts-check

// @type BMKeyboardShortcutModifier

/**
 * Contains constants representing the modifier keys that can be used when registering keyboard shortcuts
 * for views and windows.
 */
export const BMKeyboardShortcutModifier = Object.freeze({ // <enum>
	/**
	 * Represents the command key on macOS and iOS, windows key on Windows and meta key on Linux.
	 */
	Command: {key: 'metaKey', value: 1}, // <enum>
	/**
	 * Represents the option key on macOS and alt on other systems.
	 */
	Option: {key: 'altKey', value: 2}, // <enum>
	/**
	 * Represents the shit key.
	 */
	Shift: {key: 'shiftKey', value: 4}, // <enum>
	/**
	 * Represents the control key.
	 */
	Control: {key: 'ctrlKey', value: 8}, // <enum>
	/**
	 * Represents the command key on macOS and iOS and control key on other systems.
	 */
	System: {key: 'systemKey', value: (navigator.platform.startsWith('Mac') || /iPhone|iPad|iPod/.test(navigator.platform)) ? 1 : 8}, // <enum>

});

// @endtype

// @type BMKeyboardShortcut

/**
 * A keyboard shortcut object describes the keys that must be pressed for a keyboard shortcut to trigger as
 * well as what should happen when that shortcut is triggered.
 */
export function BMKeyboardShortcut() {} // <constructor>

BMKeyboardShortcut.prototype = {

    /**
     * The key that should be pressed for this keyboard shortcut.
     */
    _keyCode: undefined, // <String>
    get keyCode() {
        return this._key;
    },

    /**
     * An optional array of keyboard modifiers that must be pressed
     * together with the key in order to trigger the shortcut.
     */
    _modifiers: undefined, // <[BMKeyboardShortcutModifier]>
    get modifiers() {
        if (this._modifiers) return this._modifiers.slice();
    },

    /**
     * A bitmap describing the modifiers that should be active.
     */
    _modifierBitmap: 0, // <Number>

    /**
     * The object which will handle this keyboard shortcut.
     */
    _target: undefined, // <AnyObject>
    get target() {
        return this._target;
    },
    set target(target) {
        this._target = target;
    },

    /**
     * The name of the method that will be invoked on the target object when this keyboard
     * shortcut is triggered. This method will receive the keyboard event that triggered
     * this action as its single parameter.
     */
    _action: undefined, // <String>
    get action() {
        return this._action;
    },
    set action(action) {
        this._action = action;
    },

    /**
     * When set to `YES`, the default action of the event that triggers this keyboard shortcut will be prevented.
     */
    preventsDefault: NO, // <Boolean>

    /**
     * Initializes this keyboard shortcut with the given key and optional modifiers, as well as
     * the target and action that will handle it.
     * 
     * In order to be triggered, this keyboard shortcut must be registered with an event handler such as a window
     * that can receive keyboard focus and keypress events.
     * @param key <String>                                              The key that should be pressed for this keyboard shortcut. This maps to the `code` property of keyboard events.
     * {
     * 	@param modifiers <[BMKeyboardShortcutModifier], nullable>		Defaults to an empty array. An optional array of keyboard modifiers that must be active.
     * 																	for the keyboard shortcut to fire.
     * 	@param target <AnyObject>										The object that will handle this keyboard shortcut action.
     * 	@param action <String>											The name of a method on the target object that will be invoked when this 
     * 																	keyboard shortcut is triggered. That method will receive the keyboard event as its single parameter.
     *  @param preventsDefault <Boolean, nullable>                      Defaults to `NO`. When set to `YES`, the default action of the event that triggers this keyboard shortcut will be prevented.
     * }
     * @return <BMKeyboardShortcut>                                     This keyboard shortcut.
     */
    initWithKeyCode(key, {modifiers, target, action, preventsDefault} = {modifiers: []}) {
        this._key = key;
        this._modifiers = modifiers || [];
        this._target = target;
        this._action = action;
        this.preventsDefault = preventsDefault || NO;

        for (const modifier of this._modifiers) {
            this._modifierBitmap = this._modifierBitmap | modifier.value;
        }

        return this;
    }

};

/**
 * Constructs and returns a keyboard shortcut with the given key and optional modifiers, as well as
 * the target and action that will handle it.
 * 
 * In order to be triggered, this keyboard shortcut must be registered with an event handler such as a window
 * that can receive keyboard focus and keypress events.
 * @param key <String>                                              The key that should be pressed for this keyboard shortcut. This maps to the `code` property of keyboard events.
 * {
 * 	@param modifiers <[BMKeyboardShortcutModifier], nullable>		Defaults to an empty array. An optional array of keyboard modifiers that must be active.
 * 																	for the keyboard shortcut to fire.
 * 	@param target <AnyObject>										The object that will handle this keyboard shortcut action.
 * 	@param action <String>											The name of a method on the target object that will be invoked when this 
 * 																	keyboard shortcut is triggered. That method will receive the keyboard event as its single parameter.
 * }
 * @return <BMKeyboardShortcut>                                     A keyboard shortcut.
 */
BMKeyboardShortcut.keyboardShortcutWithKeyCode = function (key, args) {
    return (new BMKeyboardShortcut).initWithKeyCode(key, args);
};

// @endtype