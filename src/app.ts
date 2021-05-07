/// <reference path="interfaces/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />

namespace DragAndDrop {
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}
