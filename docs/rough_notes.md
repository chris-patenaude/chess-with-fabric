## Hierarchy and Inheritance

[source](http://fabricjs.com/fabric-intro-part-1)

Fabric objects do not just exist independent of each other. They form a very precise hierarchy.

Most of the objects inherit from a root fabric.Object. fabric.Object pretty much represents a 2-dimensional shape, positioned in 2-dimensional canvas plane. It's an entity that has left/top and width/height properties, as well as a slew of other graphic characteristics. Those properties that we saw on objects — fill, stroke, angle, opacity, flip*, etc. — are common to all Fabric objects that inherit from fabric.Object.

This inheritance allows us to define methods on fabric.Object and share them among all child “classes”. For example, if you wanted to have getAngleInRadians method on all objects, you would simply create it on fabric.Object.prototype:

```javascript
fabric.Object.prototype.getAngleInRadians = function() {
  return this.get('angle') / 180 * Math.PI;
};

var rect = new fabric.Rect({ angle: 45 });
rect.getAngleInRadians(); // 0.785...

var circle = new fabric.Circle({ angle: 30, radius: 10 });
circle.getAngleInRadians(); // 0.523...

circle instanceof fabric.Circle; // true
circle instanceof fabric.Object; // true
```
As you can see, method immediately becomes available on all instances.

While child “classes” inherit from fabric.Object, they often also define their own methods and properties. For example, fabric.Circle needs to have “radius” property. And fabric.Image — which we'll look at in a moment — needs to have getElement/setElement methods for accessing/setting HTML \<img\> element from which image instance originates.

Working with prototypes to obtain custom rendering and behavior is very common for advanced projects.