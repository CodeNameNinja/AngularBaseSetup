import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  label: string;
  id: number;
  isChecked: boolean;
  isPlanType: boolean;
  claimId: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  label: string;
  level: number;
  expandable: boolean;
  id: number;
  isChecked: boolean;
  isPlanType: boolean;
  claimId: number;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = [
  {
    objectId: 833,
    objectType: 0,
    parentId: 0,
    name: 'Franchise Grp',
    storeId: 0,
    status: 1,
    children: [
      {
        objectId: 303,
        objectType: 0,
        parentId: 833,
        name: 'East',
        storeId: 0,
        status: 1,
        children: [
          {
            objectId: 2877761,
            objectType: 1,
            parentId: 303,
            name: '9',
            storeId: 465464646,
            status: 1,
            children: [],
          },
          {
            objectId: 2876923,
            objectType: 1,
            parentId: 303,
            name: 'a1',
            storeId: 12121,
            status: 1,
            children: [],
          },
          {
            objectId: 2877884,
            objectType: 1,
            parentId: 303,
            name: 'abc',
            storeId: 585858,
            status: 1,
            children: [],
          },
          {
            objectId: 2877709,
            objectType: 1,
            parentId: 303,
            name: 'asd',
            storeId: 100000,
            status: 1,
            children: [],
          },
          {
            objectId: 2876110,
            objectType: 1,
            parentId: 303,
            name: 'Chowly Test',
            storeId: 185211,
            status: 1,
            children: [],
          },
          {
            objectId: 2876513,
            objectType: 1,
            parentId: 303,
            name: 'Cpn1',
            storeId: 999992,
            status: 1,
            children: [],
          },
          {
            objectId: 2876514,
            objectType: 1,
            parentId: 303,
            name: 'Cpn2',
            storeId: 999993,
            status: 1,
            children: [],
          },
          {
            objectId: 2875793,
            objectType: 1,
            parentId: 303,
            name: 'Dev Store',
            storeId: 111111,
            status: 1,
            children: [],
          },
          {
            objectId: 2877885,
            objectType: 1,
            parentId: 303,
            name: 'DevOps',
            storeId: 23,
            status: 1,
            children: [],
          },
          {
            objectId: 2877886,
            objectType: 1,
            parentId: 303,
            name: 'Product Lab',
            storeId: 131522,
            status: 1,
            children: [],
          },
          {
            objectId: 2876922,
            objectType: 1,
            parentId: 303,
            name: 'sdasd',
            storeId: 54545,
            status: 1,
            children: [],
          },
          {
            objectId: 2876869,
            objectType: 1,
            parentId: 303,
            name: 'ss',
            storeId: 0,
            status: 1,
            children: [],
          },
          {
            objectId: 2875449,
            objectType: 1,
            parentId: 303,
            name: 'Store 1',
            storeId: 999998,
            status: 1,
            children: [],
          },
        ],
      },
      {
        objectId: 2875655,
        objectType: 1,
        parentId: 833,
        name: 'Main Office',
        storeId: 8665,
        status: 1,
        children: [],
      },
      {
        objectId: 2877603,
        objectType: 1,
        parentId: 833,
        name: 'Redpoint test',
        storeId: 911105,
        status: 1,
        children: [],
      },
      {
        objectId: 2875410,
        objectType: 1,
        parentId: 833,
        name: 'Revention Lab',
        storeId: 777777,
        status: 1,
        children: [],
      },
      {
        objectId: 494,
        objectType: 0,
        parentId: 833,
        name: 'West',
        storeId: 0,
        status: 1,
        children: [
          {
            objectId: 2875718,
            objectType: 1,
            parentId: 494,
            name: 'Convention Center',
            storeId: 888888,
            status: 1,
            children: [],
          },
          {
            objectId: 2875907,
            objectType: 1,
            parentId: 494,
            name: 'ED Main Hall',
            storeId: 987654,
            status: 1,
            children: [],
          },
        ],
      },
    ],
  },
];

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize(): void {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const item = obj[key];
      const node = new TodoItemNode();
      node.label = obj[key].name;
      node.id = obj[key].id;
      node.isChecked = obj[key].isChecked;
      node.claimId = obj[key].claimId;
      node.isPlanType = obj[key].isPlanType;

      if (item != null) {
        if (typeof item === 'object' && item.children != undefined) {
          node.children = this.buildFileTree(item.children, level + 1);
        } else {
          node.label = item.name;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string): void {
    if (parent.children) {
      parent.children.push({ label: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string): void {
    node.label = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-tree',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.css'],
  providers: [ChecklistDatabase],
})
export class TreeComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );

  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  checkAll(): void {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if (this.treeControl.dataNodes[i].isChecked) {
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      }
      this.treeControl.expand(this.treeControl.dataNodes[i]);
    }
  }

  GetCheckAll(): void {
    console.log(this.dataSource.data);
    // if( this.treeFlattener.flattenNodes[0].check) console.log(this.treeControl.dataNodes[i].id);

    // for (let i = 0; i < this.treeControl.dataNodes.length; i++) {

    //   if(this.treeControl.dataNodes[i].isChecked) console.log(this.treeControl.dataNodes[i].id);

    // if(this.treeControl.dataNodes[i].isChecked){
    //   console.log('---------------------------------------------');
    //     console.log(this.treeControl.dataNodes[i].id);
    //     console.log(this.treeControl.dataNodes[i].claimId);

    // }
    // }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.label === node.label
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.label = node.label;
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.isChecked = node.isChecked;
    flatNode.claimId = node.claimId;
    flatNode.isPlanType = node.isPlanType;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    node.isChecked ? (node.isChecked = false) : (node.isChecked = true);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }
}
