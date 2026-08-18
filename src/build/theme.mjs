/**
 * Generator: Palette -> VS Code color theme.
 *
 * Everything about "where a color goes" lives here; palettes only say "which
 * colors". Adding a new character should never require touching this file.
 */

/**
 * @param {string} hex `#rrggbb`
 * @param {number} amount 0..1
 * @returns {string} `#rrggbbaa`
 */
function alpha(hex, amount) {
  const a = Math.round(Math.max(0, Math.min(1, amount)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

/** @param {import('../palettes/_schema.mjs').Palette} p */
function workbenchColors(p) {
  const { ui, ansi } = p;
  return {
    // --- base ---
    focusBorder: alpha(ui.accent, 0.6),
    foreground: ui.fg,
    descriptionForeground: ui.fgMuted,
    errorForeground: ui.error,
    'icon.foreground': ui.fgMuted,
    'widget.border': ui.border,
    'widget.shadow': alpha(ui.bgDeep, 0.6),
    'selection.background': alpha(ui.selection, 0.6),
    'sash.hoverBorder': ui.accent,

    // --- text ---
    'textLink.foreground': ui.accent,
    'textLink.activeForeground': ui.accentAlt,
    'textPreformat.foreground': p.syntax.string,
    'textBlockQuote.background': ui.bgAlt,
    'textBlockQuote.border': ui.accent,
    'textCodeBlock.background': ui.bgAlt,
    'textSeparator.foreground': ui.border,

    // --- buttons / badges ---
    'button.background': ui.accent,
    'button.foreground': ui.bgDeep,
    'button.hoverBackground': ui.accentAlt,
    'button.secondaryBackground': ui.bgElevated,
    'button.secondaryForeground': ui.fg,
    'button.secondaryHoverBackground': ui.border,
    'checkbox.background': ui.bgElevated,
    'checkbox.border': ui.border,
    'badge.background': ui.accent,
    'badge.foreground': ui.bgDeep,
    'activityBarBadge.background': ui.accent,
    'activityBarBadge.foreground': ui.bgDeep,

    // --- inputs ---
    'input.background': ui.bgElevated,
    'input.foreground': ui.fg,
    'input.border': ui.border,
    'input.placeholderForeground': ui.fgSubtle,
    'inputOption.activeBorder': ui.accent,
    'inputOption.activeBackground': alpha(ui.accent, 0.2),
    'inputValidation.errorBackground': alpha(ui.error, 0.2),
    'inputValidation.errorBorder': ui.error,
    'inputValidation.warningBackground': alpha(ui.warning, 0.2),
    'inputValidation.warningBorder': ui.warning,
    'inputValidation.infoBackground': alpha(ui.info, 0.2),
    'inputValidation.infoBorder': ui.info,
    'dropdown.background': ui.bgElevated,
    'dropdown.foreground': ui.fg,
    'dropdown.border': ui.border,
    'dropdown.listBackground': ui.bgElevated,

    // --- scrollbar ---
    'scrollbar.shadow': alpha(ui.bgDeep, 0.5),
    'scrollbarSlider.background': alpha(ui.fgSubtle, 0.2),
    'scrollbarSlider.hoverBackground': alpha(ui.fgSubtle, 0.35),
    'scrollbarSlider.activeBackground': alpha(ui.accent, 0.5),

    // --- lists / trees ---
    'list.activeSelectionBackground': alpha(ui.accent, 0.22),
    'list.activeSelectionForeground': ui.fg,
    'list.inactiveSelectionBackground': alpha(ui.accent, 0.12),
    'list.inactiveSelectionForeground': ui.fg,
    'list.hoverBackground': alpha(ui.fgSubtle, 0.1),
    'list.hoverForeground': ui.fg,
    'list.focusBackground': alpha(ui.accent, 0.25),
    'list.focusForeground': ui.fg,
    'list.highlightForeground': ui.accent,
    'list.errorForeground': ui.error,
    'list.warningForeground': ui.warning,
    'list.dropBackground': alpha(ui.accent, 0.2),
    'tree.indentGuidesStroke': alpha(ui.fgSubtle, 0.4),

    // --- activity bar / sidebar ---
    'activityBar.background': ui.bgDeep,
    'activityBar.foreground': ui.fg,
    'activityBar.inactiveForeground': ui.fgSubtle,
    'activityBar.border': ui.border,
    'activityBar.activeBorder': ui.accent,
    'activityBar.activeBackground': alpha(ui.accent, 0.1),
    'sideBar.background': ui.bgDeep,
    'sideBar.foreground': ui.fgMuted,
    'sideBar.border': ui.border,
    'sideBarTitle.foreground': ui.fg,
    'sideBarSectionHeader.background': ui.bgAlt,
    'sideBarSectionHeader.foreground': ui.fg,
    'sideBarSectionHeader.border': ui.border,

    // --- editor group / tabs ---
    'editorGroup.border': ui.border,
    'editorGroupHeader.tabsBackground': ui.bgDeep,
    'editorGroupHeader.tabsBorder': ui.border,
    'editorGroupHeader.noTabsBackground': ui.bgDeep,
    'editorGroup.dropBackground': alpha(ui.accent, 0.2),
    'tab.activeBackground': ui.bg,
    'tab.activeForeground': ui.fg,
    'tab.activeBorderTop': ui.accent,
    'tab.inactiveBackground': ui.bgDeep,
    'tab.inactiveForeground': ui.fgSubtle,
    'tab.border': ui.border,
    'tab.hoverBackground': ui.bgAlt,
    'tab.unfocusedActiveForeground': ui.fgMuted,
    'tab.unfocusedInactiveForeground': ui.fgSubtle,
    'tab.activeModifiedBorder': ui.modified,
    'tab.inactiveModifiedBorder': alpha(ui.modified, 0.5),
    'editorPane.background': ui.bg,

    // --- editor ---
    'editor.background': ui.bg,
    'editor.foreground': ui.fg,
    'editorCursor.foreground': ui.cursor,
    'editorLineNumber.foreground': ui.fgSubtle,
    'editorLineNumber.activeForeground': ui.accent,
    'editor.lineHighlightBackground': ui.lineHighlight,
    'editor.lineHighlightBorder': '#00000000',
    'editor.selectionBackground': alpha(ui.selection, 0.45),
    'editor.selectionHighlightBackground': alpha(ui.selection, 0.25),
    'editor.inactiveSelectionBackground': alpha(ui.selection, 0.25),
    'editor.wordHighlightBackground': alpha(ui.accent, 0.18),
    'editor.wordHighlightStrongBackground': alpha(ui.accentAlt, 0.22),
    'editor.findMatchBackground': alpha(ui.accentAlt, 0.45),
    'editor.findMatchHighlightBackground': alpha(ui.accentAlt, 0.22),
    'editor.findRangeHighlightBackground': alpha(ui.selection, 0.2),
    'editor.hoverHighlightBackground': alpha(ui.accent, 0.15),
    'editor.rangeHighlightBackground': alpha(ui.accent, 0.1),
    'editor.foldBackground': alpha(ui.selection, 0.2),
    'editorWhitespace.foreground': alpha(ui.fgSubtle, 0.35),
    'editorIndentGuide.background1': alpha(ui.fgSubtle, 0.2),
    'editorIndentGuide.activeBackground1': alpha(ui.accent, 0.5),
    'editorRuler.foreground': alpha(ui.border, 0.8),
    'editorCodeLens.foreground': ui.fgSubtle,
    'editorBracketMatch.background': alpha(ui.accent, 0.2),
    'editorBracketMatch.border': ui.accent,
    'editorBracketHighlight.foreground1': ansi.brightYellow,
    'editorBracketHighlight.foreground2': ansi.brightMagenta,
    'editorBracketHighlight.foreground3': ansi.brightCyan,
    'editorBracketHighlight.foreground4': ansi.brightGreen,
    'editorBracketHighlight.foreground5': ansi.brightBlue,
    'editorBracketHighlight.foreground6': ansi.brightRed,
    'editorBracketHighlight.unexpectedBracket.foreground': ui.error,
    'editorLink.activeForeground': ui.accent,
    'editorOverviewRuler.border': ui.border,
    'editorOverviewRuler.findMatchForeground': alpha(ui.accentAlt, 0.6),
    'editorOverviewRuler.selectionHighlightForeground': alpha(ui.selection, 0.5),
    'editorOverviewRuler.errorForeground': ui.error,
    'editorOverviewRuler.warningForeground': ui.warning,
    'editorOverviewRuler.infoForeground': ui.info,
    'editorOverviewRuler.addedForeground': ui.added,
    'editorOverviewRuler.modifiedForeground': ui.modified,
    'editorOverviewRuler.deletedForeground': ui.removed,

    // --- diagnostics ---
    'editorError.foreground': ui.error,
    'editorWarning.foreground': ui.warning,
    'editorInfo.foreground': ui.info,
    'editorHint.foreground': ui.fgMuted,
    'problemsErrorIcon.foreground': ui.error,
    'problemsWarningIcon.foreground': ui.warning,
    'problemsInfoIcon.foreground': ui.info,

    // --- gutter ---
    'editorGutter.background': ui.bg,
    'editorGutter.addedBackground': ui.added,
    'editorGutter.modifiedBackground': ui.modified,
    'editorGutter.deletedBackground': ui.removed,
    'editorGutter.foldingControlForeground': ui.fgMuted,

    // --- widgets ---
    'editorWidget.background': ui.bgElevated,
    'editorWidget.foreground': ui.fg,
    'editorWidget.border': ui.border,
    'editorSuggestWidget.background': ui.bgElevated,
    'editorSuggestWidget.border': ui.border,
    'editorSuggestWidget.foreground': ui.fg,
    'editorSuggestWidget.highlightForeground': ui.accent,
    'editorSuggestWidget.selectedBackground': alpha(ui.accent, 0.22),
    'editorHoverWidget.background': ui.bgElevated,
    'editorHoverWidget.border': ui.border,
    'editorMarkerNavigation.background': ui.bgElevated,
    'editorMarkerNavigationError.background': ui.error,
    'editorMarkerNavigationWarning.background': ui.warning,
    'editorMarkerNavigationInfo.background': ui.info,
    'peekView.border': ui.accent,
    'peekViewEditor.background': ui.bgAlt,
    'peekViewEditor.matchHighlightBackground': alpha(ui.accentAlt, 0.35),
    'peekViewResult.background': ui.bgDeep,
    'peekViewResult.selectionBackground': alpha(ui.accent, 0.2),
    'peekViewResult.matchHighlightBackground': alpha(ui.accentAlt, 0.35),
    'peekViewTitle.background': ui.bgDeep,
    'peekViewTitleLabel.foreground': ui.fg,
    'peekViewTitleDescription.foreground': ui.fgMuted,

    // --- diff / merge ---
    'diffEditor.insertedTextBackground': alpha(ui.added, 0.14),
    'diffEditor.removedTextBackground': alpha(ui.removed, 0.14),
    'diffEditor.insertedLineBackground': alpha(ui.added, 0.1),
    'diffEditor.removedLineBackground': alpha(ui.removed, 0.1),
    'diffEditor.border': ui.border,
    'merge.currentHeaderBackground': alpha(ui.accent, 0.35),
    'merge.currentContentBackground': alpha(ui.accent, 0.15),
    'merge.incomingHeaderBackground': alpha(ui.info, 0.35),
    'merge.incomingContentBackground': alpha(ui.info, 0.15),
    'merge.border': ui.border,

    // --- panel / terminal ---
    'panel.background': ui.bgDeep,
    'panel.border': ui.border,
    'panelTitle.activeForeground': ui.fg,
    'panelTitle.activeBorder': ui.accent,
    'panelTitle.inactiveForeground': ui.fgSubtle,
    'panelSection.border': ui.border,
    'terminal.background': ui.bgDeep,
    'terminal.foreground': ui.fg,
    'terminal.selectionBackground': alpha(ui.selection, 0.4),
    'terminalCursor.foreground': ui.cursor,
    'terminal.border': ui.border,
    'terminal.ansiBlack': ansi.black,
    'terminal.ansiRed': ansi.red,
    'terminal.ansiGreen': ansi.green,
    'terminal.ansiYellow': ansi.yellow,
    'terminal.ansiBlue': ansi.blue,
    'terminal.ansiMagenta': ansi.magenta,
    'terminal.ansiCyan': ansi.cyan,
    'terminal.ansiWhite': ansi.white,
    'terminal.ansiBrightBlack': ansi.brightBlack,
    'terminal.ansiBrightRed': ansi.brightRed,
    'terminal.ansiBrightGreen': ansi.brightGreen,
    'terminal.ansiBrightYellow': ansi.brightYellow,
    'terminal.ansiBrightBlue': ansi.brightBlue,
    'terminal.ansiBrightMagenta': ansi.brightMagenta,
    'terminal.ansiBrightCyan': ansi.brightCyan,
    'terminal.ansiBrightWhite': ansi.brightWhite,

    // --- status bar ---
    'statusBar.background': ui.bgDeep,
    'statusBar.foreground': ui.fgMuted,
    'statusBar.border': ui.border,
    'statusBar.noFolderBackground': ui.bgDeep,
    'statusBar.debuggingBackground': ui.accent,
    'statusBar.debuggingForeground': ui.bgDeep,
    'statusBarItem.hoverBackground': alpha(ui.fgSubtle, 0.15),
    'statusBarItem.remoteBackground': ui.accent,
    'statusBarItem.remoteForeground': ui.bgDeep,
    'statusBarItem.errorBackground': ui.error,
    'statusBarItem.errorForeground': ui.bgDeep,
    'statusBarItem.warningBackground': ui.warning,
    'statusBarItem.warningForeground': ui.bgDeep,

    // --- title bar / menus ---
    'titleBar.activeBackground': ui.bgDeep,
    'titleBar.activeForeground': ui.fg,
    'titleBar.inactiveBackground': ui.bgDeep,
    'titleBar.inactiveForeground': ui.fgSubtle,
    'titleBar.border': ui.border,
    'menu.background': ui.bgElevated,
    'menu.foreground': ui.fg,
    'menu.selectionBackground': alpha(ui.accent, 0.25),
    'menu.selectionForeground': ui.fg,
    'menu.separatorBackground': ui.border,
    'menu.border': ui.border,
    'menubar.selectionBackground': alpha(ui.accent, 0.2),
    'menubar.selectionForeground': ui.fg,

    // --- quick pick / command palette ---
    'quickInput.background': ui.bgElevated,
    'quickInput.foreground': ui.fg,
    'quickInputList.focusBackground': alpha(ui.accent, 0.22),
    'pickerGroup.border': ui.border,
    'pickerGroup.foreground': ui.accent,
    'commandCenter.background': ui.bgAlt,
    'commandCenter.foreground': ui.fgMuted,
    'commandCenter.border': ui.border,
    'keybindingLabel.background': ui.bgElevated,
    'keybindingLabel.foreground': ui.fg,
    'keybindingLabel.border': ui.border,
    'keybindingLabel.bottomBorder': ui.border,

    // --- notifications ---
    'notificationCenterHeader.background': ui.bgDeep,
    'notifications.background': ui.bgElevated,
    'notifications.foreground': ui.fg,
    'notifications.border': ui.border,
    'notificationLink.foreground': ui.accent,
    'notificationsErrorIcon.foreground': ui.error,
    'notificationsWarningIcon.foreground': ui.warning,
    'notificationsInfoIcon.foreground': ui.info,

    // --- git / SCM ---
    'gitDecoration.addedResourceForeground': ui.added,
    'gitDecoration.modifiedResourceForeground': ui.modified,
    'gitDecoration.deletedResourceForeground': ui.removed,
    'gitDecoration.untrackedResourceForeground': ui.success,
    'gitDecoration.ignoredResourceForeground': ui.ignored,
    'gitDecoration.conflictingResourceForeground': ui.warning,
    'gitDecoration.stageModifiedResourceForeground': ui.modified,
    'gitDecoration.stageDeletedResourceForeground': ui.removed,

    // --- debug ---
    'debugToolBar.background': ui.bgElevated,
    'debugIcon.breakpointForeground': ui.error,
    'debugIcon.breakpointDisabledForeground': alpha(ui.error, 0.5),
    'editor.stackFrameHighlightBackground': alpha(ui.warning, 0.2),
    'editor.focusedStackFrameHighlightBackground': alpha(ui.success, 0.2),
    'debugConsoleInputIcon.foreground': ui.accent,
    'debugTokenExpression.name': p.syntax.property,
    'debugTokenExpression.value': p.syntax.string,
    'debugTokenExpression.string': p.syntax.string,
    'debugTokenExpression.number': p.syntax.number,
    'debugTokenExpression.boolean': p.syntax.constant,
    'debugTokenExpression.error': ui.error,

    // --- breadcrumbs / minimap ---
    'breadcrumb.foreground': ui.fgSubtle,
    'breadcrumb.focusForeground': ui.fg,
    'breadcrumb.activeSelectionForeground': ui.accent,
    'breadcrumbPicker.background': ui.bgElevated,
    'minimap.findMatchHighlight': alpha(ui.accentAlt, 0.6),
    'minimap.selectionHighlight': alpha(ui.selection, 0.6),
    'minimap.errorHighlight': ui.error,
    'minimap.warningHighlight': ui.warning,
    'minimapGutter.addedBackground': ui.added,
    'minimapGutter.modifiedBackground': ui.modified,
    'minimapGutter.deletedBackground': ui.removed,

    // --- settings / welcome ---
    'settings.headerForeground': ui.fg,
    'settings.modifiedItemIndicator': ui.accent,
    'settings.dropdownBackground': ui.bgElevated,
    'settings.dropdownBorder': ui.border,
    'settings.textInputBackground': ui.bgElevated,
    'settings.textInputBorder': ui.border,
    'settings.numberInputBackground': ui.bgElevated,
    'settings.numberInputBorder': ui.border,
    'welcomePage.tileBackground': ui.bgAlt,
    'welcomePage.tileHoverBackground': ui.bgElevated,
    'welcomePage.progress.foreground': ui.accent,

    // --- charts ---
    'charts.foreground': ui.fg,
    'charts.lines': ui.border,
    'charts.red': ansi.red,
    'charts.blue': ansi.blue,
    'charts.yellow': ansi.yellow,
    'charts.orange': ui.warning,
    'charts.green': ansi.green,
    'charts.purple': ansi.magenta,
  };
}

/** @param {import('../palettes/_schema.mjs').Palette} p */
function tokenColors(p) {
  const s = p.syntax;
  /** @type {[string, string[], string?][]} */
  const rules = [
    ['Comment', ['comment', 'punctuation.definition.comment', 'string.comment'], s.comment],
    ['Keyword', [
      'keyword',
      'keyword.control',
      'keyword.other',
      'punctuation.definition.keyword',
    ], s.keyword],
    ['Storage', [
      'storage',
      'storage.type',
      'storage.modifier',
      'keyword.declaration',
    ], s.storage],
    ['Operator', [
      'keyword.operator',
      'punctuation.accessor',
      'punctuation.separator.key-value',
    ], s.operator],
    ['String', [
      'string',
      'string.quoted',
      'punctuation.definition.string',
      'string.template',
    ], s.string],
    ['String escape / interpolation', [
      'constant.character.escape',
      'punctuation.definition.template-expression',
      'punctuation.section.embedded',
      'meta.template.expression',
    ], s.stringEscape],
    ['Regexp', [
      'string.regexp',
      'constant.other.character-class.regexp',
      'keyword.operator.quantifier.regexp',
    ], s.regexp],
    ['Number', ['constant.numeric', 'constant.numeric.integer', 'constant.numeric.float'], s.number],
    ['Constant', [
      'constant.language',
      'constant.other',
      'variable.other.constant',
      'support.constant',
    ], s.constant],
    ['Function', [
      'entity.name.function',
      'support.function',
      'meta.function-call.generic',
      'variable.function',
    ], s.function],
    ['Variable', [
      'variable',
      'variable.other.readwrite',
      'meta.definition.variable.name',
      'source',
    ], s.variable],
    ['Parameter', ['variable.parameter', 'meta.parameter'], s.parameter],
    ['Property', [
      'variable.other.property',
      'variable.other.object.property',
      'meta.object-literal.key',
      'support.type.property-name',
    ], s.property],
    ['Class', [
      'entity.name.type.class',
      'entity.name.class',
      'entity.other.inherited-class',
      'support.class',
      'entity.name.type.enum',
    ], s.class],
    ['Type', [
      'entity.name.type',
      'entity.name.type.interface',
      'support.type',
      'entity.name.namespace',
      'meta.type.annotation',
    ], s.type],
    ['Decorator', [
      'meta.decorator',
      'entity.name.function.decorator',
      'punctuation.decorator',
      'meta.annotation',
    ], s.decorator],
    ['Punctuation', [
      'punctuation',
      'meta.brace',
      'punctuation.definition.parameters',
      'punctuation.separator',
      'punctuation.terminator',
    ], s.punctuation],
    ['Tag', [
      'entity.name.tag',
      'punctuation.definition.tag',
      'meta.tag',
    ], s.tag],
    ['Attribute / selector', [
      'entity.other.attribute-name',
      'entity.other.attribute-name.class',
      'entity.other.attribute-name.id',
      'entity.name.tag.css',
    ], s.attribute],
    ['Invalid', ['invalid', 'invalid.illegal'], s.invalid],
  ];

  const tokens = rules.map(([name, scope, foreground]) => ({
    name,
    scope,
    settings: { foreground },
  }));

  // Rules that need italic/bold on top of the color.
  tokens.push(
    {
      name: 'Comment (italic)',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: s.comment, fontStyle: 'italic' },
    },
    {
      name: 'Parameter (italic)',
      scope: ['variable.parameter', 'meta.parameter'],
      settings: { foreground: s.parameter, fontStyle: 'italic' },
    },
    {
      name: 'Deprecated',
      scope: ['entity.name.function.deprecated', 'invalid.deprecated'],
      settings: { foreground: s.invalid, fontStyle: 'strikethrough' },
    },
    // --- markdown ---
    {
      name: 'Markdown heading',
      scope: ['markup.heading', 'entity.name.section'],
      settings: { foreground: p.ui.accent, fontStyle: 'bold' },
    },
    {
      name: 'Markdown bold',
      scope: ['markup.bold'],
      settings: { foreground: s.constant, fontStyle: 'bold' },
    },
    {
      name: 'Markdown italic',
      scope: ['markup.italic'],
      settings: { foreground: s.constant, fontStyle: 'italic' },
    },
    {
      name: 'Markdown link',
      scope: ['markup.underline.link', 'string.other.link'],
      settings: { foreground: p.ui.accentAlt, fontStyle: 'underline' },
    },
    {
      name: 'Markdown list / quote',
      scope: ['markup.list punctuation.definition.list', 'markup.quote'],
      settings: { foreground: s.punctuation },
    },
    {
      name: 'Markdown inline code',
      scope: ['markup.inline.raw', 'markup.fenced_code'],
      settings: { foreground: s.string },
    },
    {
      name: 'Diff inserted',
      scope: ['markup.inserted'],
      settings: { foreground: p.ui.added },
    },
    {
      name: 'Diff deleted',
      scope: ['markup.deleted'],
      settings: { foreground: p.ui.removed },
    },
    {
      name: 'Diff changed',
      scope: ['markup.changed'],
      settings: { foreground: p.ui.modified },
    },
  );

  return tokens;
}

/** @param {import('../palettes/_schema.mjs').Palette} p */
function semanticTokenColors(p) {
  const s = p.syntax;
  return {
    namespace: s.type,
    class: s.class,
    enum: s.class,
    interface: s.type,
    struct: s.class,
    typeParameter: s.type,
    type: s.type,
    parameter: { foreground: s.parameter, fontStyle: 'italic' },
    variable: s.variable,
    'variable.readonly': s.constant,
    'variable.defaultLibrary': s.constant,
    property: s.property,
    'property.readonly': s.constant,
    enumMember: s.constant,
    function: s.function,
    'function.defaultLibrary': s.function,
    method: s.function,
    macro: s.decorator,
    decorator: s.decorator,
    label: s.keyword,
    keyword: s.keyword,
    string: s.string,
    number: s.number,
    regexp: s.regexp,
    operator: s.operator,
    'comment.documentation': { foreground: s.comment, fontStyle: 'italic' },
  };
}

/**
 * @param {import('../palettes/_schema.mjs').Palette} palette
 * @returns {object} theme ready to be written as `themes/<id>-color-theme.json`
 */
export function buildTheme(palette) {
  return {
    $schema: 'vscode://schemas/color-theme',
    name: palette.label,
    type: palette.type,
    semanticHighlighting: true,
    colors: workbenchColors(palette),
    semanticTokenColors: semanticTokenColors(palette),
    tokenColors: tokenColors(palette),
  };
}

export { alpha };
