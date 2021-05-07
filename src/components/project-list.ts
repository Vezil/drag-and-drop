namespace DragAndDrop {
    export class ProjectList
        extends Component<HTMLDivElement, HTMLElement>
        implements DragTarget {
        assignedProjects: Project[];

        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`);

            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        @autobindValue
        dragOverHandler(event: DragEvent) {
            if (
                event.dataTransfer &&
                event.dataTransfer.types[0] === 'text/plain'
            ) {
                event.preventDefault();
                const listElement = this.element.querySelector('ul')!;
                listElement.classList.add('droppable');
            }
        }

        @autobindValue
        dropHandler(event: DragEvent) {
            const projectId = event.dataTransfer!.getData('text/plain');
            const status =
                this.type === 'active'
                    ? ProjectStatus.Active
                    : ProjectStatus.Finished;

            projectState.moveProject(projectId, status);
        }

        @autobindValue
        dragLeaveHandler(_: DragEvent) {
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.remove('droppable');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);

            projectState.addListener((projects: Project[]) => {
                const relevantProjects = projects.filter((project) => {
                    if (this.type === 'active') {
                        return project.status === ProjectStatus.Active;
                    }

                    return project.status === ProjectStatus.Finished;
                });

                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }

        renderContent() {
            const listId = `${this.type}-projects-list`;

            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent =
                this.type.toUpperCase() + 'PROJECTS';
        }

        private renderProjects() {
            const listElement = document.getElementById(
                `${this.type}-projects-list`
            ) as HTMLInputElement;

            listElement.innerHTML = '';

            for (const project of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul')!.id, project);
            }
        }
    }
}
