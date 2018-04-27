import { Serializer, SerializerRegistry, Model, hasMany, Db, Schema } from '@bigtest/mirage';
import { module, test } from 'qunit';

module('Integration | Serializers | Base | Associations | Sideloading Assorted Collections', {
  beforeEach() {
    this.schema = new Schema(new Db(), {
      wordSmith: Model.extend({
        blogPosts: hasMany()
      }),
      blogPost: Model,
      greatPhoto: Model
    });

    let BaseSerializer = Serializer.extend({
      embed: false
    });
    this.registry = new SerializerRegistry(this.schema, {
      application: BaseSerializer,
      wordSmith: BaseSerializer.extend({
        include: ['blogPosts']
      }),
      greatPhoto: BaseSerializer.extend({
        attrs: ['id', 'title']
      })
    });
    this.wordSmiths = [
      { id: '1', name: 'Link', blogPostIds: ['1', '2'] },
      { id: '2', name: 'Zelda', blogPostIds: [] },
      { id: '3', name: 'Epona', blogPostIds: [] }
    ];
    this.blogPosts = [
      { id: '1', title: 'Lorem' },
      { id: '2', title: 'Ipsum' }
    ];
    this.greatPhotos = [
      { id: '1', title: 'Amazing', location: 'Hyrule' },
      { id: '2', title: 'greatPhoto', location: 'Goron City' }
    ];
    this.schema.db.loadData({
      wordSmiths: this.wordSmiths,
      blogPosts: this.blogPosts,
      greatPhotos: this.greatPhotos
    });
  },
  afterEach() {
    this.schema.db.emptyData();
  }
});

/*
  This is a strange response from a route handler, but it's used in the array get shorthand. Deprecate that shorthand?
*/
test(`it can sideload an array of assorted collections that have relationships`, function(assert) {
  let result = this.registry.serialize([this.schema.wordSmiths.all(), this.schema.greatPhotos.all()]);

  assert.deepEqual(result, {
    wordSmiths: this.wordSmiths,
    blogPosts: this.blogPosts,
    greatPhotos: this.greatPhotos.map((attrs) => {
      delete attrs.location;
      return attrs;
    })
  });
});
