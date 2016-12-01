const path = require('path');
const loader = require('../');

describe('loader', () => {
  before('loader_before', () => {
    require('chai').should();
  });

  it('loader_walk_production_default_development', () => {
    const configuration = loader.loading(path.join(__dirname, '../config/production_default_development'), 'config.json');

    configuration.mode.should.eql('production');
    configuration.host.should.eql('localhost');
    configuration.marvelAuth.should.eql('marvel.gate.marvelous.com');
    configuration.dcAuth.should.eql('marvel.gate.marvelous.com');
    
    configuration.database.redis.host.should.eql('123.123.123.123');
    configuration.database.redis.port.should.eql(4444);
    configuration.database.redis.user.should.eql("hulk");
    configuration.database.redis.pw.should.eql("robertBruceBanner");

    configuration.database.mysql.host.should.eql('111.112.113.114');
    configuration.database.mysql.port.should.eql(3306);
    configuration.database.mysql.user.should.eql('scarletWitch');
    configuration.database.mysql.pw.should.eql('wandaMaximoff');

    configuration.hero.dccomic['Justice League'].member.should.eql([
      "Batman",
      "the Flash",
      "Green Lantern",
      "Superman",
      "Wonder Woman"
    ]);
    
    configuration.hero.dccomic.superman.should.eql({
      'name': 'Clark Kent',
      'species': 'Kryptonian',
      'placeOfOrigin': 'Krypton',
      'abilities': [
        'Superhuman strength, speed, senses, durability, longevity',
        'Flight',
        'Heat vision',
        'Freezing breath',
        'Extrasensory and visual powers, including X-ray vision',
        'Enhanced intelligence',
        'Nigh-Invulnerability'
      ]
    });
  });

  it('loader_walk_production_default_development_hocon', () => {
    const configuration = loader.loading(path.join(__dirname, '../config/production_default_development_hocon'), 'config.conf');

    configuration.mode.should.eql('production');
    configuration.host.should.eql('localhost');
    configuration.marvelAuth.should.eql('marvel.gate.marvelous.com');
    configuration.dcAuth.should.eql('marvel.gate.marvelous.com');

    configuration.database.redis.host.should.eql('123.123.123.123');
    configuration.database.redis.port.should.eql(4444);
    configuration.database.redis.user.should.eql("hulk");
    configuration.database.redis.pw.should.eql("robertBruceBanner");

    configuration.database.mysql.host.should.eql('111.112.113.114');
    configuration.database.mysql.port.should.eql(3306);
    configuration.database.mysql.user.should.eql('scarletWitch');
    configuration.database.mysql.pw.should.eql('wandaMaximoff');

    configuration.hero.dccomic['JusticeLeague'].member.should.eql([
      "Batman",
      "the Flash",
      "Green Lantern",
      "Superman",
      "Wonder Woman"
    ]);

    configuration.hero.dccomic.superman.should.eql({
      'name': 'Clark Kent',
      'species': 'Kryptonian',
      'placeOfOrigin': 'Krypton',
      'abilities': [
        'Superhuman strength, speed, senses, durability, longevity',
        'Flight',
        'Heat vision',
        'Freezing breath',
        'Extrasensory and visual powers, including X-ray vision',
        'Enhanced intelligence',
        'Nigh-Invulnerability'
      ]
    });
  });

  it('loader_walk_production_default_development_hjson', () => {
    const configuration = loader.loading(path.join(__dirname, '../config/production_default_development_hjson'), 'config.hjson');

    configuration.mode.should.eql('production');
    configuration.host.should.eql('localhost');
    configuration.marvelAuth.should.eql('marvel.gate.marvelous.com');
    configuration.dcAuth.should.eql('marvel.gate.marvelous.com');

    configuration.database.redis.host.should.eql('123.123.123.123');
    configuration.database.redis.port.should.eql(4444);
    configuration.database.redis.user.should.eql("hulk");
    configuration.database.redis.pw.should.eql("robertBruceBanner");

    configuration.database.mysql.host.should.eql('111.112.113.114');
    configuration.database.mysql.port.should.eql(3306);
    configuration.database.mysql.user.should.eql('scarletWitch');
    configuration.database.mysql.pw.should.eql('wandaMaximoff');

    configuration.hero.dccomic['Justice League'].member.should.eql([
      "Batman",
      "the Flash",
      "Green Lantern",
      "Superman",
      "Wonder Woman"
    ]);

    configuration.hero.dccomic.superman.should.eql({
      'name': 'Clark Kent',
      'species': 'Kryptonian',
      'placeOfOrigin': 'Krypton',
      'abilities': [
        'Superhuman strength, speed, senses, durability, longevity',
        'Flight',
        'Heat vision',
        'Freezing breath',
        'Extrasensory and visual powers, including X-ray vision',
        'Enhanced intelligence',
        'Nigh-Invulnerability'
      ]
    });
  });

  it('loader_walk_production_default_development_yaml', () => {
    const configuration = loader.loading(path.join(__dirname, '../config/production_default_development_yaml'), 'config.yaml');

    configuration.mode.should.eql('production');
    configuration.host.should.eql('localhost');
    configuration.marvelAuth.should.eql('marvel.gate.marvelous.com');
    configuration.dcAuth.should.eql('marvel.gate.marvelous.com');

    configuration.database.redis.host.should.eql('123.123.123.123');
    configuration.database.redis.port.should.eql(4444);
    configuration.database.redis.user.should.eql("hulk");
    configuration.database.redis.pw.should.eql("robertBruceBanner");

    configuration.database.mysql.host.should.eql('111.112.113.114');
    configuration.database.mysql.port.should.eql(3306);
    configuration.database.mysql.user.should.eql('scarletWitch');
    configuration.database.mysql.pw.should.eql('wandaMaximoff');

    configuration.hero.dccomic['Justice League'].member.should.eql([
      "Batman",
      "the Flash",
      "Green Lantern",
      "Superman",
      "Wonder Woman"
    ]);

    configuration.hero.dccomic.superman.should.eql({
      'name': 'Clark Kent',
      'species': 'Kryptonian',
      'placeOfOrigin': 'Krypton',
      'abilities': [
        'Superhuman strength, speed, senses, durability, longevity',
        'Flight',
        'Heat vision',
        'Freezing breath',
        'Extrasensory and visual powers, including X-ray vision',
        'Enhanced intelligence',
        'Nigh-Invulnerability'
      ]
    });
  });

  it('loader_walk_development_default_common', () => {
    const configuration = loader.loading(path.join(__dirname, '../config/development_default_common'), 'config.json');
    
    configuration.mode.should.eql('development');
    configuration.host.should.eql('localhost');
    configuration.marvelAuth.should.eql('marvel.gate.marvelous.com');
    configuration.dcAuth.should.eql('marvel.gate.marvelous.com');

    configuration.database.redis.host.should.eql('123.123.123.123');
    configuration.database.redis.port.should.eql(4444);
    configuration.database.redis.user.should.eql("hulk");
    configuration.database.redis.pw.should.eql("robertBruceBanner");

    configuration.database.mysql.host.should.eql('111.112.113.114');
    configuration.database.mysql.port.should.eql(3306);
    configuration.database.mysql.user.should.eql('scarletWitch');
    configuration.database.mysql.pw.should.eql('wandaMaximoff');

    configuration.hero.dccomic['Justice League'].member.should.eql([
      "Batman",
      "the Flash",
      "Green Lantern",
      "Superman",
      "Wonder Woman"
    ]);

    configuration.hero.dccomic.superman.should.eql({
      'name': 'Clark Kent',
      'species': 'Kryptonian',
      'placeOfOrigin': 'Krypton',
      'abilities': [
        'Superhuman strength, speed, senses, durability, longevity',
        'Flight',
        'Heat vision',
        'Freezing breath',
        'Extrasensory and visual powers, including X-ray vision',
        'Enhanced intelligence',
        'Nigh-Invulnerability'
      ]
    });
  });
});