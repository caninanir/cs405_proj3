/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }


    //can.inanir - 31159
    draw(mvp, modelView, normalMatrix, modelMatrix) {
        let currentTransformation = this.trs.getTransformationMatrix();
        let combinedModelMatrix = MatrixMult(modelMatrix, currentTransformation);


        let combinedMvp = MatrixMult(mvp, currentTransformation);
        let combinedModelView = MatrixMult(modelView, currentTransformation);
        let combinedNormalMatrix = getNormalMatrix(combinedModelView);


        if (this.meshDrawer) {
            this.meshDrawer.draw(combinedMvp, combinedModelView, combinedNormalMatrix, combinedModelMatrix);
        }

        for (let child of this.children) {
            child.draw(combinedMvp, combinedModelView, combinedNormalMatrix, combinedModelMatrix);
        }
    }

    

}