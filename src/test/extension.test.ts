import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Jule Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Extension should be present', () => {
    const ext = vscode.extensions.getExtension('julelang.jule');
    assert.ok(ext, 'Extension should be installed');
  });

  test('Extension should activate', async () => {
    const ext = vscode.extensions.getExtension('julelang.jule');
    assert.ok(ext, 'Extension should exist');
    
    if (ext && !ext.isActive) {
      await ext.activate();
    }
    
    assert.ok(ext?.isActive, 'Extension should be activated');
  });

  test('Jule language should be registered', async () => {
    const languages = await vscode.languages.getLanguages();
    assert.ok(
      languages.includes('jule'),
      'Jule language should be registered'
    );
  });

  test('Jule Module language should be registered', async () => {
    const languages = await vscode.languages.getLanguages();
    assert.ok(
      languages.includes('julemod'),
      'Jule Module language should be registered'
    );
  });

  test('jule.version command should be registered', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(
      commands.includes('jule.version'),
      'jule.version command should be registered'
    );
  });

  test('.jule files should use jule language', async () => {
    const languages = await vscode.languages.getLanguages();
    assert.ok(
      languages.includes('jule'),
      'jule language should be available for .jule files'
    );
  });

  test('Jule syntax highlighting should be configured', async () => {
    const ext = vscode.extensions.getExtension('julelang.jule');
    const grammars = ext?.packageJSON.contributes?.grammars;
    
    assert.ok(grammars, 'Grammars should be defined');
    assert.ok(
      grammars.some((g: any) => g.language === 'jule'),
      'Jule grammar should be defined'
    );
  });

  test('Module syntax highlighting should be configured', async () => {
    const ext = vscode.extensions.getExtension('julelang.jule');
    const grammars = ext?.packageJSON.contributes?.grammars;
    
    assert.ok(grammars, 'Grammars should be defined');
    assert.ok(
      grammars.some((g: any) => g.language === 'julemod'),
      'Module grammar should be defined'
    );
  });

  test('Snippets should be available', async () => {
    const ext = vscode.extensions.getExtension('julelang.jule');
    const snippets = ext?.packageJSON.contributes?.snippets;
    
    assert.ok(snippets, 'Snippets should be defined');
    assert.ok(
      snippets.some((s: any) => s.language === 'jule'),
      'Jule snippets should be defined'
    );
  });
});